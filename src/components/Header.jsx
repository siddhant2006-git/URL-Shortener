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
    <>
      <nav className="py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full bg-transparent z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" className="h-12 sm:h-14 lg:h-16" alt="Trimmer Logo" />
        </Link>

        {/* Right Side */}
        <div>
          {!user ? (
            <Button
              onClick={() => navigate("/auth")}
              className="text-sm sm:text-base"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={user?.user_metadata?.profile_pic}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-[#11141b] border border-[#2a2d33]  text-sm sm:text-base">
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
                  className="text-red-400 cursor-pointer flex items-center"
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
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <BarLoader className="w-full" color="#00eeff" />
        </div>
      )}
    </>
  );
};

export default Header;
