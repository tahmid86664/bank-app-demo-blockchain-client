import React, { useEffect, useState } from "react";
import "./DummyAccounts.scss";
import axios from "../../axios";

const DummyAccounts = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/users");
      setUsers(res.data);
    };

    fetchData();
  });

  const handleClick = () => {
    console.log("entering dummy acc");
  };

  return (
    <div className="dummyAccounts">
      <h1>Dummy Accounts 🧔 </h1>
      <div className="accountContainer">
        {users.map((user) => (
          <div key={user._id} className="account" onClick={handleClick}>
            <div className="accountName">
              {user.firstName + " " + user.lastName}
            </div>
            <div className="accountNumber">Acc no: {user._id}</div>
            <div className="accountNumber">NID: {user.NID}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DummyAccounts;
