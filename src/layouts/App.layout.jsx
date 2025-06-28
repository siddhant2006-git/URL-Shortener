import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        {/* Body */}
        <Outlet />
      </main>

      <footer className="w-full mt-10 p-4 md:p-6 text-center border border-[#1f1f22]">
        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg tracking-wide">
          Made with <span className="text-pink-500">💗</span> by Kartikey
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;
