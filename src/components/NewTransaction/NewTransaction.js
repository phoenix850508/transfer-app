import Dashboard from "components/dashboard/Dashboard";
import Header from "components/header/Header";
import React from "react";
import Stepper from "./Stepper";
import TransactionForm from "./NewTransactionForm";
import NavbarContainer from "components/container/NavbarContainer";

function NewTransaction() {
  return (
    <NavbarContainer>
      <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-5xl mt-10 m-5 sm:p-2 md:p-5 flex flex-col gap-10">
        <Stepper />
        <TransactionForm />
      </div>
    </NavbarContainer>
  );
}

export default NewTransaction;
