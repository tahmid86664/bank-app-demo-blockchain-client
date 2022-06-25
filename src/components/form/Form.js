import React, { useState } from "react";
import "./Form.scss";

const Form = ({ isCreateTransaction }) => {
  const [transactionType, setTransactionType] = useState(
    "---Transaction Type---"
  );

  const handleSubmit = (e) => {
    console.log("created account");

    e.preventDefault();
  };

  const handleCreateTransaction = (e) => {
    console.log("transaction created");

    e.preventDefault();
  };

  return (
    <div className="formContainer">
      <form
        onSubmit={!isCreateTransaction ? handleSubmit : handleCreateTransaction}
      >
        {!isCreateTransaction ? (
          <div className="inputContainer">
            <input type="text" placeholder="Enter first name" />
            <input type="text" placeholder="Enter last name" />
            <input type="text" placeholder="Enter NID no" />
            <input type="text" placeholder="Enter mobile" />
            <input type="email" placeholder="Enter email" />
            <input type="password" placeholder="Enter password for online tr" />
            <input type="text" placeholder="Enter present address" />
            <input type="text" placeholder="Enter permanent address" />
            <input type="text" placeholder="Enter nomini first name" />
            <input type="text" placeholder="Enter nomini last name" />
            <input type="text" placeholder="Enter nomini NID no" />
            <input type="text" placeholder="Enter nomini mobile" />
            <input type="text" placeholder="Enter relationship with nomini" />
          </div>
        ) : (
          <div className="inputContainer">
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="type">---Transaction Type---</option>
              <option value="cd">cd</option>
              <option value="cw">cw</option>
              <option value="cwo">cwo</option>
            </select>
            <input type="text" placeholder="Enter account no" />
            <input type="text" placeholder="Enter NID no" />
            {transactionType === "cwo" && (
              <>
                <input type="text" placeholder="Enter withdrawer name" />
                <input type="text" placeholder="Enter withdrawer NID no" />
                <input type="text" placeholder="Enter withdrawer mobile" />
              </>
            )}
            <input type="number" placeholder="Enter amount" />
          </div>
        )}

        <div className="buttonContainer">
          <button type="submit">
            {!isCreateTransaction ? "Create Account" : "Make Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
