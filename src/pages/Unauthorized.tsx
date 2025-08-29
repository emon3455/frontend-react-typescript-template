import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gradient-to-r dark:from-black dark:via-slate-900 dark:to-black p-6">
      <div className="max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-4">
            <ShieldAlert className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Unauthorized Access
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400">
          Sorry, you don’t have permission to view this page.  
          If you believe this is a mistake, please contact the administrator.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-300">
            <Link to="/">🏠 Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/login">🔑 Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
