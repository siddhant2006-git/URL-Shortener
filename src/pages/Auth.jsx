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
    <div className="mt-20 flex flex-col items-center gap-10 px-4 sm:px-0">
      <h1 className="text-3xl md:text-5xl font-thin text-black text-center">
        {searchParams.get("createNew")
          ? "Hold up! Let's Login first..."
          : "Login / Signup"}
        {/* searchParams.get() Returns the first value associated to the given search parameter. */}
      </h1>

      <Tabs defaultValue="login" className="w-full max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2 gap-2 border-b border-gray-300">
          <TabsTrigger
            className="p-2 text-black font-thin text-center hover:bg-gray-100 transition rounded-t"
            value="login"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            className="p-2 text-black font-thin text-center hover:bg-gray-100 transition rounded-t"
            value="signup"
          >
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="w-full mt-4">
          <Login />
        </TabsContent>
        <TabsContent value="signup" className="w-full mt-4">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
