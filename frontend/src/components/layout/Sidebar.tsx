import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  Truck,
  Settings,
  Menu,
} from "lucide-react";
import { cn } from "../../lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Orders", href: "/orders", icon: ClipboardList },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Suppliers", href: "/suppliers", icon: Truck },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div
      className={cn(
        "flex flex-col fixed inset-y-0 left-0 z-50 w-64  bg-gray-90 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        !isOpen && "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className={cn("flex items-center", !isOpen && "justify-center")}>
          {isOpen ? (
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Stackify 💼
            </span>
          ) : (
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              S
            </span>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center px-2 py-2 text-lg font-bold  rounded-md transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-500"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              )
            }
          >
            <item.icon className={cn("h-5 w-5", !isOpen && "mx-auto")} />
            {isOpen && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
