import { Bell, User } from "lucide-react";
import { useAuthStore } from "../../store/auth";
import { Button } from "../../components/ui/button";

export function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  console.log(user);

  return (
    <header className="h-16 border-b border-gray-200 ">
      <div className="h-full px-4 flex items-center justify-between">
        <span className="text-xl">Welcome {user?.firstName}</span>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
