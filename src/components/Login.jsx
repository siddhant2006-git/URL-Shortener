/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/Use-fetch";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../Context";

const Login = () => {
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });

      await fnLogin();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Card className="mt-8 lg:mt-12 w-full max-w-sm lg:max-w-md mx-auto p-6 lg:p-8 bg-background border border-border rounded-xl shadow-sm font-sans">
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl lg:text-2xl font-semibold text-foreground break-words leading-tight">
          Login
        </CardTitle>
        <CardDescription className="text-sm lg:text-base text-muted-foreground break-words leading-relaxed">
          Login to your account if you already have one
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <Input
            className="w-full px-4 py-3 lg:py-4 text-foreground bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-base lg:text-lg placeholder:text-muted-foreground"
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="space-y-2">
          <Input
            className="w-full px-4 py-3 lg:py-4 text-foreground bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-base lg:text-lg placeholder:text-muted-foreground"
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>

      <CardFooter className="pt-6">
        <Button
          className="w-full py-3 lg:py-4 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all duration-200 shadow-sm hover:shadow-md text-base lg:text-lg"
          onClick={handleLogin}
        >
          {loading ? <BeatLoader size={10} color="#ffffff" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
