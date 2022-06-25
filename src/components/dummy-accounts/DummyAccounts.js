import React from "react";
import "./DummyAccounts.scss";

const DummyAccounts = () => {
  const handleClick = () => {
    console.log("entering dummy acc");
  };

  return (
    <div className="dummyAccounts">
      <h1>Dummy Accounts 🧔 </h1>
      <div className="accountContainer">
        <div className="account" onClick={handleClick}>
          <div className="accountName">Tahmid</div>
          <div className="accountNumber">62b15ed7e562bfc4a6b431b7</div>
        </div>
        <div className="account" onClick={handleClick}>
          <div className="accountName">Person</div>
          <div className="accountNumber">acc no</div>
        </div>
        <div className="account" onClick={handleClick}>
          <div className="accountName">Person</div>
          <div className="accountNumber">acc no</div>
        </div>
        <div className="account" onClick={handleClick}>
          <div className="accountName">Person</div>
          <div className="accountNumber">acc no</div>
        </div>
      </div>
    </div>
  );
};

export default DummyAccounts;
