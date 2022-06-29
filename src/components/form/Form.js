import React, { useState } from "react";
import "./Form.scss";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const Form = ({ isCreateTransaction }) => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState(
    "---Transaction Type---"
  );
  const [branch, setBranch] = useState("branch");
  const [transactionFormVal, setTransactionFormVal] = useState({});
  const [userFormVal, setUserFormVal] = useState({});
  const [nominiFormVal, setNominiFormVal] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ ...userFormVal, nomini: nominiFormVal });
    const res = await axios.post("/users", {
      ...userFormVal,
      nomini: nominiFormVal,
    });

    alert("Account has been created successfully");
    console.log(res);
  };

  const handleUserFormValChange = (e) => {
    const { name, value } = e.target;

    setUserFormVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNominiFormValChange = (e) => {
    const { name, value } = e.target;

    setNominiFormVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
            <input
              name="firstName"
              type="text"
              placeholder="Enter first name"
              onChange={handleUserFormValChange}
            />
            <input
              name="lastName"
              type="text"
              placeholder="Enter last name"
              onChange={handleUserFormValChange}
            />
            <input
              name="NID"
              type="text"
              placeholder="Enter NID no"
              onChange={handleUserFormValChange}
            />
            <input
              name="mobile"
              type="text"
              placeholder="Enter mobile"
              onChange={handleUserFormValChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleUserFormValChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Enter password for online tr"
              onChange={handleUserFormValChange}
            />
            <input
              name="presentAddress"
              type="text"
              placeholder="Enter present address"
              onChange={handleUserFormValChange}
            />
            <input
              name="permanentAddress"
              type="text"
              placeholder="Enter permanent address"
              onChange={handleUserFormValChange}
            />
            {/* nomini */}
            <input
              name="firstName"
              type="text"
              placeholder="Enter nomini first name"
              onChange={handleNominiFormValChange}
            />
            <input
              name="lastName"
              type="text"
              placeholder="Enter nomini last name"
              onChange={handleNominiFormValChange}
            />
            <input
              name="NID"
              type="text"
              placeholder="Enter nomini NID no"
              onChange={handleNominiFormValChange}
            />
            <input
              name="mobile"
              type="text"
              placeholder="Enter nomini mobile"
              onChange={handleNominiFormValChange}
            />
            <input
              name="relationship"
              type="text"
              placeholder="Enter relationship with nomini"
              onChange={handleNominiFormValChange}
            />
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
