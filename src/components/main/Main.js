import React from "react";
import Dashboard from "components/dashboard/Dashboard";
import Header from "components/header/Header";

function Main() {
  return (
    <div className="flex">
      <Dashboard />
      <Header />
    </div>
  );
}

export default Main;
