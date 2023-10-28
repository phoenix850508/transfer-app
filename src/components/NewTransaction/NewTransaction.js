import React, { useState } from "react";
import Stepper from "./Stepper";
import TransactionForm from "./NewTransactionForm";
import NavbarContainer from "components/container/NavbarContainer";

function NewTransaction() {
  const [step, setStep] = useState("contact");
  const handleContactClick = () => {
    setStep("payment");
  };
  const handlePaymentClick = () => {
    setStep("complete");
  };
  const handleNewTransaction = (e) => {
    e.preventDefault();
    setStep("contact");
  };
  return (
    <NavbarContainer>
      <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-5xl mt-10 m-5 sm:p-2 md:p-5 flex flex-col gap-10">
        <Stepper step={step} />
        <TransactionForm
          onContactClick={handleContactClick}
          onPaymentClick={handlePaymentClick}
          onNewTransactionClick={handleNewTransaction}
          step={step}
        />
      </div>
    </NavbarContainer>
  );
}

export default NewTransaction;
