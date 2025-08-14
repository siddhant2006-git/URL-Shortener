import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "../Context";
import useFetch from "@/hooks/Use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const { loading, fn: fnLogout } = useFetch(logout);
  const { user, fetchUser } = UrlState();

  const handleLogout = async () => {
    await fnLogout();
    fetchUser();
    navigate("/auth");
  };

  return (
    <div className="w-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black hover:text-gray-700"
        >
          ShortenX
        </Link>

        {/* Right Side */}
        <div>
          {!user ? (
            <Button
              onClick={() => navigate("/auth")}
              className="text-sm sm:text-base bg-black text-white hover:bg-gray-900"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    className="object-cover"
                    src={user?.user_metadata?.profile_pic}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-gray-50 border border-gray-200 text-black text-sm sm:text-base">
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* My Links */}
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>

                {/* Logout */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 cursor-pointer flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>

      {/* Optional loading bar */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BarLoader className="w-full" color="#00eeff" />
        </div>
      )}
    </div>
  );
};

export default Header;
