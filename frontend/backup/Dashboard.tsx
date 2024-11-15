"use client";

import { useState, useEffect } from "react";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProductStore } from "@/store/products";

const sampleData = {
  totalProducts: 1245,
  totalOrders: 856,
  totalCustomers: 3200,
  totalRevenue: 125000,
  revenueData: [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5400 },
    { month: "Mar", revenue: 3800 },
    { month: "Apr", revenue: 5900 },
    { month: "May", revenue: 6300 },
    { month: "Jun", revenue: 7000 },
  ],
  customerGrowth: [
    { month: "Jan", newCustomers: 120, totalCustomers: 2800 },
    { month: "Feb", newCustomers: 140, totalCustomers: 2940 },
    { month: "Mar", newCustomers: 160, totalCustomers: 3100 },
    { month: "Apr", newCustomers: 180, totalCustomers: 3280 },
    { month: "May", newCustomers: 200, totalCustomers: 3480 },
    { month: "Jun", newCustomers: 220, totalCustomers: 3700 },
  ],
  topSellingProducts: [
    { id: 1, name: "Premium Headphones", sales: 1200, revenue: 120000 },
    { id: 2, name: "Wireless Mouse", sales: 950, revenue: 47500 },
    { id: 3, name: "Ergonomic Keyboard", sales: 800, revenue: 64000 },
    { id: 4, name: "Ultra HD Monitor", sales: 600, revenue: 180000 },
    { id: 5, name: "Portable SSD", sales: 550, revenue: 55000 },
  ],
  lowStockItems: [
    { id: 1, name: "Wireless Earbuds", stockLevel: 5, threshold: 20 },
    { id: 2, name: "Gaming Mouse", stockLevel: 8, threshold: 25 },
    { id: 3, name: "Mechanical Keyboard", stockLevel: 3, threshold: 15 },
    { id: 4, name: "Webcam", stockLevel: 7, threshold: 30 },
    { id: 5, name: "USB-C Hub", stockLevel: 4, threshold: 20 },
  ],
  recentOrders: [
    {
      id: 1001,
      customer: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "completed",
      date: "2024-11-10",
      total: 299.99,
    },
    {
      id: 1002,
      customer: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "processing",
      date: "2024-11-11",
      total: 149.5,
    },
    {
      id: 1003,
      customer: {
        name: "Bob Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "pending",
      date: "2024-11-12",
      total: 79.99,
    },
    {
      id: 1004,
      customer: {
        name: "Alice Brown",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "completed",
      date: "2024-11-13",
      total: 199.99,
    },
    {
      id: 1005,
      customer: {
        name: "Charlie Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "processing",
      date: "2024-11-14",
      total: 349.99,
    },
  ],
};

export default function Dashboard() {
  const [data, setData] = useState(sampleData);
  const [totalProducts, setTotalProducts] = useState(0);
  const getTotalProducts = useProductStore((state) => state.getTotalProducts);
  const productsStore = useProductStore((state) => state.products);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      const total = await getTotalProducts();

      if (total !== undefined) {
        setTotalProducts(total);
      }
      setData(sampleData);
    };

    fetchData();
  }, [getTotalProducts]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Summary</h1>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
          <Card className="rounded-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                +7% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${data.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.customerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="newCustomers" fill="#8884d8" />
                  <Bar dataKey="totalCustomers" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.topSellingProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>${product.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.lowStockItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.stockLevel}</TableCell>
                      <TableCell>
                        <Progress
                          value={(item.stockLevel / item.threshold) * 100}
                          className="w-[60px]"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-sm">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src={order.customer.avatar}
                            alt={order.customer.name}
                          />
                          <AvatarFallback>
                            {order.customer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {order.customer.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${order.total.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
