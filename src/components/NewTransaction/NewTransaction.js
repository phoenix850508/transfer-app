import Dashboard from "components/dashboard/Dashboard";
import Header from "components/header/Header";
import React from "react";
import Stepper from "./Stepper";
import TransactionForm from "./NewTransactionForm";

function NewTransaction() {
  return (
    <div className="flex relative">
      <Dashboard />
      <div className="w-full">
        <Header />
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-3xl mt-10 m-5 sm:p-2 md:p-5 flex flex-col gap-10">
          <Stepper />
          <TransactionForm />
        </div>
      </div>
    </div>
  );
}

export default NewTransaction;
