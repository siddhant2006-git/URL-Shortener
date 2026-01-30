import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <Header />
        {/* Body */}
        <Outlet />
      </main>

      <footer className="w-full mt-12 lg:mt-16 p-6 lg:p-8 text-center border border-light-gray bg-off-white rounded-t-lg">
        <p className="text-medium-gray text-base lg:text-lg tracking-wide leading-relaxed">
          Made with <span className="text-black">❤️</span> by Kartikey
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;
