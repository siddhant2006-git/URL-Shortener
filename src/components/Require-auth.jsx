/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { UrlState } from "../Context.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function RequireAuth({ children }) {
  // require auth function will take a component/page , means children as parameter in function is a component jo return krega
  const navigate = useNavigate();

  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth");
  }, [isAuthenticated, loading]);

  if (loading)
    return <BarLoader className="mb-4" width="100%" color="#111" height={4} />;

  if (isAuthenticated) return children;
}

export default RequireAuth;
