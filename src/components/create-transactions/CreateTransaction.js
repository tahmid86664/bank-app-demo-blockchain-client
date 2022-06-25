import React from "react";
import "./CreateTransaction.scss";
import Form from "../form/Form";

const CreateTransaction = () => {
  return (
    <div className="createTransaction">
      <h1>Create Transaction 🚀</h1>
      <Form isCreateTransaction />
    </div>
  );
};

export default CreateTransaction;
