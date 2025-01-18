import {
  Outlet,
  Navigate,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import React, { useEffect } from "react";
import { removeCookie } from "@/util";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "@/pages/Login/loginSlice";
function PrivateRoutes({ children }) {
  const { isLogin, token } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      if (token) {
        dispatch(getInfoUser(token)).then((res) => {
          if (res?.error) {
            removeCookie("token");
            navigate("/sign-in");
          }
        });
      } else {
        navigate("/sign-in");
      }
    }
  }, [isLogin]);
  return children;
}

export default PrivateRoutes;
