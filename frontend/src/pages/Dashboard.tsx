// import { div, div, div } from "@/components/ui/chart"
// import { div, div, div, div, div } from "@/components/ui/div"
// import { div } from "@/components/ui/div"
import { Package, ShoppingCart, AlertTriangle, DollarSign } from "lucide-react";
import { useAuthStore } from "../store/auth";
import { useProductStore } from "@/store/products";
import { useEffect, useState } from "react";

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

const lowStockItems = [
  { id: 1, name: "Product A", currentStock: 5, threshold: 10 },
  { id: 2, name: "Product B", currentStock: 3, threshold: 15 },
  { id: 3, name: "Product C", currentStock: 8, threshold: 20 },
];

export default function Dashboard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [totalProducts, setTotalProducts] = useState(0);
  const getTotalProducts = useProductStore((state) => state.getTotalProducts);

  useEffect(() => {
    const fetch = async () => {
      const total = await getTotalProducts();
      if (total !== undefined) {
        setTotalProducts(total);
      }
      console.log("Total Products Count:", total);
    };
    fetch();
  }, [getTotalProducts]);

  console.log("Is authenticated: ", isAuthenticated);

  return (
    <div className={"min-h-screen"}>
      <div className="  min-h-screen">
        <header className=" shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl text-stone-900 font-bold  ">Dashboard</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div>
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
            <div>
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
            <div>
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-lg font-medium flex justify-center items-center ">
                  Low Stock Alerts
                  <AlertTriangle className="h-4 w-4 mx-3 text-muted-foreground" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3 critical, 9 warning
                </p>
              </div>
            </div>
            <div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* <div> */}
            {/* <div>
                <div>Order Status</div>
                <div>Distribution of current order statuses</div>
              </div> */}
            {/* <div> */}
            {/* <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      
                    </PieChart>
                  </ResponsiveContainer>
                </div> */}
            {/* </div> */}
            {/* </div> */}

            <div>
              <div>
                <div className="font-bold text-lg">Low Stock Items</div>
                <div>Products requiring immediate attention</div>
              </div>
              <div>
                <ul className="space-y-4">
                  {lowStockItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium">{item.name}</span>
                      <div>
                        <span className="text-lg text-gray-500  mr-2">
                          {item.currentStock} / {item.threshold}
                        </span>
                        <div>Low Stock</div>
                      </div>
                    </li>
                  ))}
                </ul>
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
                        <p className="text-lg text-gray-500 ">
                          {activity.details}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* my customE Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div>
                <div className="font-bold text-lg">Customer Metrics</div>
                <div>Overview of customer-related data</div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Customers</span>
                  <span className="font-bold">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>New Customers (This Month)</span>
                  <span className="font-bold">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Repeat Purchase Rate</span>
                  <span className="font-bold">68%</span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="font-bold text-lg">Supplier Metrics</div>
                <div>Overview of supplier-related data</div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Active Suppliers</span>
                  <span className="font-bold">87</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pending Orders</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Lead Time</span>
                  <span className="font-bold">5 days</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
