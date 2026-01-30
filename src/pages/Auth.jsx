/* eslint-disable react-hooks/exhaustive-deps */
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "../Context";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Auth = () => {
  let [searchParams] = useSearchParams();

  const LongLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${LongLink ? `createNew=${LongLink}` : ""}`);
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="mt-20 lg:mt-24 flex flex-col items-center gap-12 px-4 sm:px-0 font-sans">
      <h1 className="text-4xl lg:text-5xl font-semibold text-black text-center leading-tight tracking-tight max-w-2xl mx-auto">
        {searchParams.get("createNew")
          ? "Hold up! Let's Login first..."
          : "Login / Signup"}
        {/* searchParams.get() Returns the first value associated to the given search parameter. */}
      </h1>

      <Tabs defaultValue="login" className="w-full max-w-md lg:max-w-lg">
        <TabsList className="grid w-full grid-cols-2 gap-2 border-b border-light-gray  bg-off-white rounded-lg">
          <TabsTrigger
            className="text-black font-semibold text-center hover:bg-white transition-all duration-200 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-base lg:text-lg"
            value="login"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            className="text-black font-semibold text-center hover:bg-white transition-all duration-200 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-base lg:text-lg"
            value="signup"
          >
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="w-full mt-6">
          <Login />
        </TabsContent>
        <TabsContent value="signup" className="w-full mt-6">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
