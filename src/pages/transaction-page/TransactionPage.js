import React, { useState } from "react";
import "./TransactionPage.scss";
// import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const [stepCounter, setStepCounter] = useState(1);
  // const navigate = useNavigate();

  const handleClick = () => {
    setStepCounter(stepCounter + 1);
  };

  // for redirecting
  // useEffect(() => {
  //   if (stepCounter >= 11) {
  //     navigate("/");
  //   }
  // }, [stepCounter]);

  return (
    <div className="transactionPage">
      <div className="top">
        <h1>Making a Transaction</h1>
      </div>
      <div className="middle">
        <div className="middle_left">
          <div className="middle_left_top">
            <div className="human">
              <img
                src={process.env.PUBLIC_URL + "/images/human_cartoon.png"}
                alt="human img"
              />
            </div>
            <div className="branch">
              <h2 className="branch_top">Branch 1</h2>
              <div className="branch_middle">
                <div className="workingStatus">Checking data</div>
                <div className="notification">Notification: 1</div>
              </div>
              <div className="branch_bottom">Block info</div>
            </div>
          </div>
          <div className="middle_left_bottom">
            <div className="branch">
              <h2 className="branch_top">Branch 2</h2>
              <div className="branch_middle">
                <div className="workingStatus">Checking data</div>
                <div className="notification">Notification: 1</div>
              </div>
              <div className="branch_bottom">Block info</div>
            </div>
            <div className="branch">
              <h2 className="branch_top">Branch 3</h2>
              <div className="branch_middle">
                <div className="workingStatus">Checking data</div>
                <div className="notification">Notification: 1</div>
              </div>
              <div className="branch_bottom">Block info</div>
            </div>
          </div>
        </div>

        <div className="middle_right">
          <div className="middle_right1">
            <div className={`stepBlock ${stepCounter === 1 && "current"}`}>
              1. Data in selected branch
            </div>
            <button
              onClick={handleClick}
              className={(stepCounter > 11 || stepCounter === 11) && "disabled"}
            >
              Next Step
            </button>
          </div>
          <div className="middle_right2">
            <div className={`stepBlock ${stepCounter === 2 && "current"}`}>
              2. Check info
            </div>
            <div className={`stepBlock ${stepCounter === 3 && "current"}`}>
              3. Send a verification code
            </div>
            <div className={`stepBlock ${stepCounter === 4 && "current"}`}>
              4. Get the code and make a block
            </div>
            <div className={`stepBlock ${stepCounter === 5 && "current"}`}>
              5. Send to other branches
            </div>
            <div
              className={`stepBlock smallFont ${
                stepCounter === 6 && "current"
              }`}
            >
              6. Other branches check the block and send notification (yes/no)
            </div>
          </div>
          <div className="middle_right3">
            <div
              className={`stepBlock smallFont ${
                stepCounter === 7 && "current"
              }`}
            >
              7. Get notification from other branch (yes/no)
            </div>
            <div className={`stepBlock ${stepCounter === 8 && "current"}`}>
              8. If Yes then add the block to BC
            </div>
            <div className={`stepBlock ${stepCounter === 9 && "current"}`}>
              9. If No then cancel the transaction
            </div>
            <div
              className={`stepBlock smallFont ${
                stepCounter === 10 && "current"
              }`}
            >
              10. Send yes to the other branches to save block in their BC
            </div>
            <div className={`stepBlock ${stepCounter === 11 && "current"}`}>
              11. Transaction completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
