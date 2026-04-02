import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NoPermission from "../NoPermission";

const CheckAuth = () => {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    if (token) setOk(true);
    else setOk(false);
  }, []);

  return ok ? <Outlet /> : <NoPermission />;
};

export default CheckAuth;
