import Dashboard from "components/dashboard/Dashboard";
import Header from "components/header/Header";
import React from "react";

function NavbarContainer({ children }) {
  return (
    <div className="flex relative">
      <Dashboard />
      <div className="w-full">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default NavbarContainer;
