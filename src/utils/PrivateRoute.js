import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/reusable/Loading";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../features/auth/authSlice";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const {user: {email}, isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  if (isLoading) {
    dispatch(toggleLoading())
    return <Loading />;
  }

  if (!isLoading && !email) {
    return <Navigate to='/login' state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
