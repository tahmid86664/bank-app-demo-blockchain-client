import React, { useState } from "react";
import "./Form.scss";
import { useNavigate } from "react-router-dom";

const Form = ({ isCreateTransaction }) => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState(
    "---Transaction Type---"
  );
  const [branch, setBranch] = useState("branch");
  const [transactionFormVal, setTransactionFormVal] = useState({});

  const handleSubmit = (e) => {
    console.log("created account");

    e.preventDefault();
  };

  const handleTransactionValChange = (e) => {
    const { name, value } = e.target;

    setTransactionFormVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateTransaction = (e) => {
    e.preventDefault();
    // console.log(transactionFormVal);
    transactionFormVal.branch = branch;
    transactionFormVal.transactionType = transactionType;
    navigate(`/transaction/${transactionFormVal.acc}`, {
      state: transactionFormVal,
    });

    console.log("transaction created");
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
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
              }}
            >
              <option value="branch">---Select Branch---</option>
              <option value="1">Branch 1</option>
              <option value="2">Branch 2</option>
              <option value="3">Branch 3</option>
            </select>
            <select
              value={transactionType}
              onChange={(e) => {
                setTransactionType(e.target.value);
              }}
            >
              <option value="type">---Transaction Type---</option>
              <option value="cd">cd</option>
              <option value="cw">cw</option>
              <option value="cwo">cwo</option>
            </select>

            <input
              type="text"
              name="acc"
              placeholder="Enter account no"
              required
              onChange={handleTransactionValChange}
            />
            <input
              type="text"
              name="nid"
              placeholder="Enter NID no"
              required
              onChange={handleTransactionValChange}
            />
            {transactionType === "cwo" && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter withdrawer name"
                  required
                  onChange={handleTransactionValChange}
                />
                <input
                  type="text"
                  name="withdrawerNid"
                  placeholder="Enter withdrawer NID no"
                  required
                  onChange={handleTransactionValChange}
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Enter withdrawer mobile"
                  required
                  onChange={handleTransactionValChange}
                />
              </>
            )}
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              required
              onChange={handleTransactionValChange}
            />
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
