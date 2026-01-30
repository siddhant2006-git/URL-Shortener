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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 flex justify-between items-center font-sans">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-black hover:text-dark-gray transition-colors"
        >
          ShortenX
        </Link>

        {/* Right Side */}
        <div>
          {!user ? (
            <Button
              onClick={() => navigate("/auth")}
              className="text-base lg:text-lg bg-black text-white hover:bg-near-black px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-colors font-medium"
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

              <DropdownMenuContent className="bg-off-white border border-light-gray text-black text-base lg:text-lg rounded-lg shadow-sm px-4 py-2">
                <DropdownMenuLabel className="font-semibold text-base lg:text-lg">
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* My Links */}
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center text-base lg:text-lg py-2 px-3 hover:bg-off-white rounded-md transition-colors">
                    <LinkIcon className="mr-3 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>

                {/* Logout */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-black cursor-pointer flex items-center hover:bg-off-white py-2 px-3 rounded-md transition-colors text-base lg:text-lg"
                >
                  <LogOut className="mr-3 h-4 w-4" />
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
          <BarLoader className="w-full" color="#000000" />
        </div>
      )}
    </div>
  );
};

export default Header;
