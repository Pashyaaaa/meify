import React from "react";
import useAuth from "../hooks/useAuth";

function DashboardPage({ code }) {
  const accessToken = useAuth(code);
  return (
    <div>
      <h1 className="text-3xl">Dashboard, Here's Your Code!</h1>
      <p>{code}</p>
    </div>
  );
}

export default DashboardPage;
