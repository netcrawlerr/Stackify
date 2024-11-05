
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Star,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

type Supplier = {
  id: number;
  name: string;
  category: string;
  rating: number;
  email: string;
  phone: string;
  since: string;
  mostSoldItem: string;
  status: string;
};

type Transaction = {
  id: number;
  supplierId: number;
  date: string;
  amount: number;
  status: string;
};

type SupplierDetailsModalProps = {
  supplier: Supplier | null;
  transactions: Transaction[];
  isOpen: boolean;
  onClose: () => void;
};

export default function SupplierModal({
  supplier,
  transactions,
  isOpen,
  onClose,
}: SupplierDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!supplier) return null;

  const supplierTransactions = transactions.filter(
    (t) => t.supplierId === supplier.id
  );
  const totalTransactions = supplierTransactions.length;
  const totalSpent = supplierTransactions.reduce((sum, t) => sum + t.amount, 0);
  const avgOrderValue =
    totalTransactions > 0 ? totalSpent / totalTransactions : 0;
  const onTimeDeliveryRate = 95; 
  const qualityScore = 4.2;  
  const responseTime = "2 hours";  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{supplier.name}</DialogTitle>
          <DialogDescription>Supplier ID: {supplier.id}</DialogDescription>
        </DialogHeader>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-grow flex flex-col"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          <ScrollArea className="flex-grow">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Email: {supplier.email}</p>
                    <p>Phone: {supplier.phone}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Supplier Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Category: {supplier.category}</p>
                    <p>
                      Status:{" "}
                      <Badge
                        variant={
                          supplier.status === "Active"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {supplier.status}
                      </Badge>
                    </p>
                    <p>Partner Since: {supplier.since}</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Total Spent</p>
                    <p className="text-2xl font-bold">
                      ${totalSpent.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Avg. Order Value</p>
                    <p className="text-2xl font-bold">
                      ${avgOrderValue.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Orders</p>
                    <p className="text-2xl font-bold">{totalTransactions}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Rating</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center space-x-2">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">
                    {supplier.rating.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">out of 5</span>
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>On-Time Delivery Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Progress value={onTimeDeliveryRate} className="w-2/3" />
                      <span className="text-2xl font-bold">
                        {onTimeDeliveryRate}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Quality Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Progress value={qualityScore * 20} className="w-2/3" />
                      <span className="text-2xl font-bold">
                        {qualityScore.toFixed(1)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{responseTime}</p>
                  <p className="text-sm text-muted-foreground">
                    Average time to respond to inquiries
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <Package className="w-5 h-5" />
                      <span>{supplier.mostSoldItem}</span>
                      <Badge variant="secondary">Best Seller</Badge>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Package className="w-5 h-5" />
                      <span>Product 2</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Package className="w-5 h-5" />
                      <span>Product 3</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Category 1</li>
                    <li>Category 2</li>
                    <li>Category 3</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {supplierTransactions.slice(0, 5).map((transaction) => (
                      <li
                        key={transaction.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">Order #{transaction.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            ${transaction.amount.toFixed(2)}
                          </span>
                          {transaction.status === "Paid" && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {transaction.status === "Pending" && (
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          )}
                          {transaction.status === "Overdue" && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Trends</CardTitle>
                </CardHeader>
                <CardContent className="h-[200px] flex items-center justify-center">
                  <TrendingUp className="w-16 h-16 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Transaction graph would go here
                  </span>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
