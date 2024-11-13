import axios from "axios";
import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Star,
  Mail,
  Phone,
  Calendar,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
// import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCategoryStore } from "@/store/category";
import { useSupplierStore } from "@/store/supplier";
import { toast } from "@/hooks/use-toast";

const initialSuppliers = [
  {
    id: 1,
    name: "TechGadgets Inc.",
    category: "Electronics",
    rating: 4.5,
    email: "contact@techgadgets.com",
    phone: "+1 (555) 123-4567",
    dateJoined: "2018-05-15",
    mostSoldItem: "Smartphone Chargers",
    status: "Active",
  },
  {
    id: 2,
    name: "FreshFoods Co.",
    category: "Food & Beverage",
    rating: 4.2,
    email: "info@freshfoods.com",
    phone: "+1 (555) 987-6543",
    dateJoined: "2019-03-22",
    mostSoldItem: "Organic Vegetables",
    status: "Active",
  },
  {
    id: 3,
    name: "EcoFurniture Ltd.",
    category: "Furniture",
    rating: 4.8,
    email: "sales@ecofurniture.com",
    phone: "+1 (555) 246-8135",
    dateJoined: "2017-11-30",
    mostSoldItem: "Ergonomic Office Chairs",
    status: "Active",
  },
  {
    id: 4,
    name: "FastShip Logistics",
    category: "Shipping",
    rating: 3.9,
    email: "support@fastship.com",
    phone: "+1 (555) 369-2580",
    dateJoined: "2020-01-10",
    mostSoldItem: "Express Delivery Service",
    status: "Under Review",
  },
  {
    id: 5,
    name: "GlobalParts Distributors",
    category: "Auto Parts",
    rating: 4.1,
    email: "orders@globalparts.com",
    phone: "+1 (555) 147-2589",
    dateJoined: "2016-09-05",
    mostSoldItem: "Brake Pads",
    status: "Active",
  },
];

export default function SuppliersPage() {
  const suppliersInStore = useSupplierStore((state) => state.suppliers);
  const updateSupplier = useSupplierStore((state) => state.updateSupplier);
  const deleteSupplier = useSupplierStore((state) => state.deleteSupplier);
  const [suppliers, setSuppliers] = useState(suppliersInStore || []);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortColumn, setSortColumn] = useState<
    keyof (typeof suppliers)[0] | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<
    (typeof suppliers)[0] | null
  >(null);

  const [isAddEditSupplierDialogOpen, setIsAddEditSupplierDialogOpen] =
    useState(false);

  const suppliersPerPage = 10;

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await axios.get("/api/supplier");
      const data = await response.data;
      console.log("ረስፖንስ", data);
      setSuppliers(data);
    };
    fetchSuppliers();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [suppliersInStore]);

  const handleSort = (column: keyof (typeof suppliers)[0]) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      (supplier.supplierName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        supplier.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (categoryFilter === "All" || supplier.category === categoryFilter) &&
      (statusFilter === "All" || supplier.status === statusFilter)
  );

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = sortedSuppliers.slice(
    indexOfFirstSupplier,
    indexOfLastSupplier
  );

  const totalPages = Math.ceil(sortedSuppliers.length / suppliersPerPage);

  const supplierInStore = useSupplierStore((state) => state.suppliers);

  const addSupplier = useSupplierStore((state) => state.addSupplier);

  const handleAddSupplier = async (data: Omit<Suppliers, "id">) => {
    await addSupplier(data);

    toast({
      title: "Supplier Added",
      description: `${data.supplierName} has been added to the supplier list.`,
    });
  };

  const handleEditSupplier = async (updatedSupplier: (typeof suppliers)[0]) => {
    try {
      await updateSupplier(updatedSupplier);
      setSuppliers(
        suppliers.map((s) =>
          s.id === updatedSupplier.id ? updatedSupplier : s
        )
      );
      console.log("suppliers", updatedSupplier.id);
      toast({
        title: "Supplier Updated",
        description: `${updatedSupplier.supplierName} has been updated in the supplier list.`,
      });
    } catch (e) {
      console.log(e);
    }

    setIsAddEditSupplierDialogOpen(false);
    setEditingSupplier(null);
  };

  const handleDeleteSupplier = async (id: number) => {
    try {
      await deleteSupplier(id);
      setSuppliers(suppliers.filter((s) => s.id !== id));
      toast({
        title: "Supplier Deleted",
        description:
          "The supplier and associated TXs have been removed from the system.",
        variant: "destructive",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const averageRating =
    suppliers.reduce((sum, supplier) => sum + supplier.rating, 0) /
    suppliers.length;

  const topRatedSuppliers = suppliers.filter(
    (supplier) => supplier.rating >= 4.5
  ).length;

  const categories = useCategoryStore((state) => state.categories);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Suppliers</h1>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Suppliers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Supplier Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Top Rated Suppliers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topRatedSuppliers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>
        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardContent>
              <div className="flex justify-between items-center mt-4 mb-6">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search suppliers..."
                      className="pl-8 w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Category: {categoryFilter}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => setCategoryFilter("All")}
                      >
                        All
                      </DropdownMenuItem>

                      {categories.map((c) => (
                        <DropdownMenuItem
                          onClick={() => setCategoryFilter(c.categoryName)}
                        >
                          {c.categoryName}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Status: {statusFilter}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("Active")}
                      >
                        Active
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("Inactive")}
                      >
                        Inactive
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("Under Review")}
                      >
                        Under Review
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Dialog
                  open={isAddEditSupplierDialogOpen}
                  onOpenChange={setIsAddEditSupplierDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingSupplier(null)}>
                      <Plus className="mr-2 h-4 w-4" /> Add Supplier
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingSupplier ? "Edit Supplier" : "Add New Supplier"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingSupplier
                          ? "Make changes to the supplier here."
                          : "Add the details of the new supplier here."}
                      </DialogDescription>
                    </DialogHeader>
                    <SupplierForm
                      initialData={editingSupplier}
                      onSubmit={
                        editingSupplier ? handleEditSupplier : handleAddSupplier
                      }
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {isLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Loading suppliers...</p>
                </div>
              ) : (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {/* <TableHead className="w-[100px]">ID</TableHead> */}
                          <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("supplierName")}
                          >
                            Name{" "}
                            {sortColumn === "name" &&
                              (sortDirection === "asc" ? "↑" : "↓")}
                          </TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("rating")}
                          >
                            Rating{" "}
                            {sortColumn === "rating" &&
                              (sortDirection === "asc" ? "↑" : "↓")}
                          </TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>dateJoined</TableHead>
                          <TableHead>Most Sold Item</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentSuppliers &&
                          currentSuppliers.map((supplier) => (
                            <TableRow key={supplier.id}>
                              <TableCell>{supplier.supplierName}</TableCell>
                              <TableCell>{supplier.category}</TableCell>
                              <TableCell>
                                <span className="flex items-center">
                                  {supplier.rating.toFixed(1)}
                                  <Star className="ml-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="flex items-center">
                                    <Mail className="mr-1 h-4 w-4" />{" "}
                                    {supplier.email}
                                  </span>
                                  <span className="flex items-center">
                                    {/* <Phone className="mr-1 h-4 w-4" />{" "} */}
                                    {supplier.phone}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="flex items-center">
                                  <Calendar className="mr-1 h-4 w-4" />{" "}
                                  {supplier.dateJoined}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className="flex items-center">
                                  <Package className="mr-1 h-4 w-4" />{" "}
                                  {supplier.mostSoldItem}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    supplier.status.toLowerCase() === "active"
                                      ? "bg-green-100 text-green-800"
                                      : supplier.status.toLowerCase() ===
                                        "inactive"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {supplier.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      className="h-8 w-8 p-0"
                                    >
                                      <span className="sr-only">Open menu</span>
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setEditingSupplier(supplier);
                                        setIsAddEditSupplierDialogOpen(true);
                                      }}
                                    >
                                      <Edit className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <DropdownMenuItem
                                          onSelect={(e) => e.preventDefault()}
                                        >
                                          <Trash className="mr-2 h-4 w-4" />{" "}
                                          Delete
                                        </DropdownMenuItem>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Are you absolutely sure?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete the supplier
                                            and all associated transactions from
                                            the system.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() =>
                                              handleDeleteSupplier(supplier.id)
                                            }
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="text-sm text-muted-foreground">
                      Showing {indexOfFirstSupplier + 1} to{" "}
                      {Math.min(indexOfLastSupplier, sortedSuppliers.length)} of{" "}
                      {sortedSuppliers.length} suppliers
                    </div>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SupplierForm({
  initialData,
  onSubmit,
}: {
  initialData?: {
    supplierName: string;
    category: string;
    rating: number;
    email: string;
    phone: string;
    dateJoined: string;
    mostSoldItem: string;
    status: string;
  } | null;
  onSubmit: (data: {
    supplierName: string;
    category: string;
    rating: number;
    email: string;
    phone: string;
    dateJoined: string;
    mostSoldItem: string;
    status: string;
  }) => void;
}) {
  const [formData, setFormData] = useState(
    initialData || {
      supplierName: "",
      category: "",
      rating: 0,
      email: "",
      phone: "",
      dateJoined: new Date().toISOString().split("T")[0],
      mostSoldItem: "",
      status: "Active",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="supplierName"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="rating" className="text-right">
            Rating
          </Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            className="col-span-3"
            required
            min="0"
            max="5"
            step="0.1"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="dateJoined" className="text-right">
            dateJoined
          </Label>
          <Input
            id="dateJoined"
            name="dateJoined"
            type="date"
            value={formData.dateJoined}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="mostSoldItem" className="text-right">
            Most Sold Item
          </Label>
          <Input
            id="mostSoldItem"
            name="mostSoldItem"
            value={formData.mostSoldItem}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="col-span-3 border rounded-md p-2"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          {initialData ? "Save changes" : "Add supplier"}
        </Button>
      </DialogFooter>
    </form>
  );
}
