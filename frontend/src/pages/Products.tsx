import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  AlertCircle,
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

import { toast, useToast } from "@/hooks/use-toast";

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
import { useCategoryStore } from "@/store/category";
import { useProductStore } from "@/store/products";
import { redirect } from "react-router-dom";
import { useStockStore } from "@/store/stocks";
import axios from "axios";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Products() {
  const categories = useCategoryStore((state) => state.categories);
  const productsFetch = useProductStore((state) => state.getProducts);
  const productsStore = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const totalProducts = useProductStore((state) => state.getTotalProducts);

  const getCategories = useCategoryStore((state) => state.getCategories);
  const createProduct = useProductStore((state) => state.createProduct);
  const lowStockItems = useProductStore((state) => state.lowStockItems());
  // console.log("categories ", categories);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [products, setProducts] = useState(productsStore || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<
    keyof (typeof products)[0] | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [productsStore, totalProducts]);

  useEffect(() => {
    getCategories();
    productsFetch();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [getCategories, productsFetch]);

  const handleSort = (column: keyof (typeof products)[0]) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || product.categoryName === categoryFilter;

    return matchesSearch && matchesCategory; // Filter by both search and category
  });

  // console.log("categoryFilter", categoryFilter);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handleAddProduct = async (newProduct) => {
    // setProducts([...products, { ...newProduct }]);
    setProducts((prevProducts) => [...prevProducts, { ...newProduct }]);
    // console.log("new", newProduct);
    // console.log("products", products);

    await createProduct(
      newProduct.name,
      newProduct.description,
      newProduct.price,
      newProduct.stock,
      newProduct.category
    );

    // await productsFetch();

    // console.log("handleAdd");

    toast({
      title: "Product added",
      description: "Has been Added in the inventory",
    });

    setIsAddEditDialogOpen(false);
  };

  const handleEditProduct = (updatedProduct) => {
    // setProducts(
    //   products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    // );

    // toast({
    //   title: "Product Updated",
    //   description: `${updatedProduct.name} has been updated in the inventory.`,
    // });
    setIsAddEditDialogOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    // console.log("The Id of product to be deleted ", id);

    await deleteProduct(id);

    toast({
      title: "Product Deleted",
      description: "The product has been removed from the inventory.",
      variant: "destructive",
    });
  };

  const totalValue = products.reduce(
    (sum, product) => sum + product.totalValue,
    0
  );
  usePageTitle("Products");
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Product Inventory</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inventory Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <div className="flex justify-between items-center mt-4 mb-6">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Category {`: ${categoryFilter}`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>

                  <DropdownMenuItem onClick={() => setCategoryFilter("All")}>
                    All
                  </DropdownMenuItem>

                  {categories &&
                    categories.map((c) => (
                      <DropdownMenuItem
                        onClick={() => setCategoryFilter(c.categoryName)}
                      >
                        {c.categoryName}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Dialog
              open={isAddEditDialogOpen}
              onOpenChange={setIsAddEditDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setEditingProduct(null)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingProduct
                      ? "Make changes to the product here."
                      : "Add the details of the new product here."}
                  </DialogDescription>
                </DialogHeader>
                <ProductForm
                  initialData={editingProduct}
                  onEdit={handleEditProduct}
                  onAddProduct={handleAddProduct}
                />
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading products...</p>
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
                        onClick={() => handleSort("name")}
                      >
                        Name{" "}
                        {sortColumn === "name" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </TableHead>

                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("categoryName")}
                      >
                        Category
                        {sortColumn === "categoryName" &&
                          (sortDirection === "asc" ? " ↑ " : " ↓ ")}
                      </TableHead>

                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("price")}
                      >
                        Price{" "}
                        {sortColumn === "price" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("stockLevel")}
                      >
                        Stock{" "}
                        {sortColumn === "stockLevel" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentProducts.map((product) => (
                      <TableRow key={product.id}>
                        {/* <TableCell className="font-medium">
                          {product.id}
                        </TableCell> */}
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.categoryName}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={
                              product.stockLevel < 10
                                ? "text-red-500 font-bold"
                                : ""
                            }
                          >
                            {product.stockLevel}
                          </span>
                          {product.stockLevel < 10 && (
                            <AlertCircle className="inline-block ml-2 h-4 w-4 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingProduct(product);
                                  setIsAddEditDialogOpen(true);
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
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete the product from the
                                      inventory.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteProduct(product.id)
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
                  Showing {indexOfFirstProduct + 1} to{" "}
                  {Math.min(indexOfLastProduct, sortedProducts.length)} of{" "}
                  {sortedProducts.length} products
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
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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
    </div>
  );
}

function ProductForm({
  initialData,
  onEdit,
  onAddProduct,
}: {
  initialData?: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
  } | null;

  onAddProduct: (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
  }) => void;

  onEdit: (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
  }) => void;
}) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
    }
  );

  const { toast } = useToast();
  const categories = useCategoryStore((state) => state.categories);

  const createProduct = useProductStore((state) => state.createProduct);
  const getProducts = useProductStore((state) => state.getProducts);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
    // console.log("category is ", document.getElementsByName("category"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      onEdit(formData);
    } else if (onAddProduct) {
      onAddProduct(formData);
    }
    console.log("formData", formData);

    // window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description{" "}
          </Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="col-span-3"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          {/* <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="col-span-3"
            required
          /> */}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="col-span-3"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="stock" className="text-right">
            Stock
          </Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="col-span-3"
            required
            min="0"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          {initialData ? "Save changes" : "Add product"}
        </Button>
      </DialogFooter>
    </form>
  );
}
