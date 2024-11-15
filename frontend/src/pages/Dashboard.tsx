import {
  Package,
  ShoppingCart,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Activity,
  Table,
  User,
} from "lucide-react";
import { useAuthStore } from "../store/auth";
import { useProductStore } from "@/store/products";
import { useEffect, useState } from "react";
import { PieChart, Cell, ResponsiveContainer, Pie, Tooltip } from "recharts";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentActivity = [
  {
    id: 1,
    action: "New order received",
    details: "Order #1234 for Product A",
    time: "5 minutes ago",
  },
  {
    id: 2,
    action: "Low stock alert",
    details: "Product B stock below threshold",
    time: "30 minutes ago",
  },
  {
    id: 3,
    action: "Payment received",
    details: "$500 received for Order #1230",
    time: "1 hour ago",
  },
  {
    id: 4,
    action: "New product added",
    details: "Product C added to inventory",
    time: "2 hours ago",
  },
  {
    id: 5,
    action: "Supplier shipment",
    details: "Restock shipment from Supplier X",
    time: "3 hours ago",
  },
];

const colors = ["#8890d8", "#82ca9d", "#ff8042", "#ff6384", "#00049F"];

export default function Dashboard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [totalProducts, setTotalProducts] = useState(0);
  const getTotalProducts = useProductStore((state) => state.getTotalProducts);
  const productsStore = useProductStore((state) => state.products);
  const products = useProductStore((state) => state.products);
  const [lowStockItems, setLowStockItems] = useState(productsStore || []);

  const lowStockItemsCount = useProductStore((state) => state.lowStockItems());

  const lowItems = products?.filter((p) => p.stockLevel < 10);

  const chartData = products
    .filter((product) => product.stockLevel < 10)
    .map((product) => ({
      name: product.name,
      stockLevel: product.stockLevel,
    }));

  useEffect(() => {
    setLowStockItems(products?.filter((p) => p.stockLevel < 10));
  }, [products, getTotalProducts]);

  useEffect(() => {
    const fetch = async () => {
      const total = await getTotalProducts();

      if (total !== undefined) {
        setTotalProducts(total);
      }
    };
    fetch();
  }, [getTotalProducts]);

  return (
    <div className={"min-h-screen"}>
      <div className="min-h-screen">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="border p-5 hover:cursor-pointer">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-lg font-medium flex justify-center items-center ">
                  Total Products
                  <Package className="h-4 w-4 mx-3 text-muted-foreground" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  +10 new this month
                </p>
              </div>
            </div>

            <div className="border p-5 hover:cursor-pointer">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-lg font-medium flex justify-center items-center ">
                  Active Orders
                  <ShoppingCart className="h-4 w-4 mx-3 text-muted-foreground" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">75</div>
                <p className="text-xs text-muted-foreground">
                  15 pending shipment
                </p>
              </div>
            </div>

            <div className="border p-5 hover:cursor-pointer">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-lg font-medium flex justify-center items-center ">
                  Low Stock Alerts
                  <AlertTriangle className="h-4 w-4 mx-3 text-muted-foreground" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">{lowStockItemsCount}</div>
                <p className="text-xs text-muted-foreground">
                  {lowStockItemsCount} warnings
                </p>
              </div>
            </div>

            <div className="border p-5 hover:cursor-pointer">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-lg font-medium flex justify-center items-center ">
                  Total Revenue
                  <DollarSign className="h-4 w-4 mx-3 text-muted-foreground" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </div>
            </div>

            <div className="border p-5 hover:cursor-pointer">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-lg font-medium flex justify-center items-center ">
                  Monthly Sales
                  <TrendingUp className="h-4 w-4 mx-3 text-muted-foreground" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">1,200</div>
                <p className="text-xs text-muted-foreground">
                  +15% increase this month
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <div>
                <div className="font-extrabold text-xl">Stock Status</div>
                <div>Distribution of current Stock statuses</div>
              </div>
              <div>
                <div className="h-[300px] border">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="stockLevel"
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name, entry) => [
                          `Stock Level: ${value}`,
                          `Product: ${entry.name}`,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div className="font-bold text-lg">Low Stock Items</div>
                <div>Products requiring immediate attention</div>
              </div>
              <div className="overflow-x-auto shadow-md rounded-lg">
                {lowStockItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <TableCell className="py-3 px-6 text-left font-medium">
                      {item.name}
                    </TableCell>
                    <TableCell className="py-3 px-6 text-left text-sm text-red-500">
                      Low Stock
                    </TableCell>
                    <TableCell className="py-3 px-6 text-left text-lg text-gray-500">
                      {item.stockLevel}
                    </TableCell>
                  </TableRow>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div>
              <div className="font-bold text-lg">Recent Activity</div>
              <div>Latest updates in your inventory system</div>
            </div>
            <div>
              <ul className="divide-y divide-gray-200 ">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="py-4">
                    <div className="flex space-x-3">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">
                            {activity.action}
                          </h3>
                          <p className="text-lg text-gray-500 ">
                            {activity.time}
                          </p>
                        </div>
                        <p className="text-md text-gray-500">
                          {activity.details}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
