import React, { useEffect, useState } from "react";
import "./TransactionPage.scss";
import { useLocation } from "react-router-dom";
import axios from "../../axios";

const TransactionPage = () => {
  const [stepCounter, setStepCounter] = useState(1);
  // const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [stepState, setStepState] = useState("Data is here");
  const [otherStepState, setOtherStepState] = useState("");
  const [blockInfo, setBlockInfo] = useState({});
  const [isSentOther, setIsSentOther] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    setData(location.state);
  }, []);

  const handleClick = () => {
    doTransactionStep();
    setStepCounter(stepCounter + 1);
  };

  const doTransactionStep = async () => {
    if (stepCounter === 1) {
      setStepState(`Data is here`);
    }
    if (stepCounter === 2) {
      const res = await axios.get(`/transactions/${data.branch}/${data.acc}`);
      setStepState(
        `Data found of Acc no ${res.data.data.acc} in ${data.branch}`
      );
    } else if (stepCounter === 3) {
      setStepState(`Sending verification message`);
    } else if (stepCounter === 4) {
      setStepState(`Have the OTP and creating block`);
      setBlockInfo(JSON.stringify(data));
    } else if (stepCounter === 5) {
      setIsSentOther(true);
    } else if (stepCounter === 6) {
      // jekhane tk joma deya hocche
      const res1 = await axios.get(
        `/transactions/${data.branch}/${data.acc}/balance`
      );

      // other branch er balance
      const res2 = await axios.get(
        `/transactions/${getBranch(2)}/${data.acc}/balance`
      );
      const res3 = await axios.get(
        `/transactions/${getBranch(3)}/${data.acc}/balance`
      );

      if (
        res1.data.data === res2.data.data &&
        res1.data.data === res3.data.data
      ) {
        setOtherStepState(`Checked the journal and it is Yes`);
        console.log(res3.data.data);
      }
    } else if (stepCounter === 7) {
      setNotification(
        `Branch ${getBranch(2)} and Branch ${getBranch(
          3
        )} has confirmed the block. Please add the Block to BC`
      );
    } else if (stepCounter === 8) {
      // setStepCounter(stepCounter + 1);
      console.log("its 8");
    }
    console.log(stepCounter);
  };

  // for redirecting
  // useEffect(() => {
  //   if (stepCounter >= 11) {
  //     navigate("/");
  //   }
  // }, [stepCounter]);

  const getBranch = (num) => {
    if (num === 2) {
      return data.branch !== "1" ? "1" : "2";
    } else if (num === 3) {
      if (data.branch !== "1") {
        if (data.branch === "2") {
          return "3";
        } else return "2";
      } else {
        return "3";
      }
    }
  };

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
              <h2 className="branch_top">Branch {data && data.branch}</h2>
              <div className="branch_middle">
                <div className="workingStatus">{stepState}</div>
                <div className="notification">{notification}</div>
              </div>
              <div className="branch_bottom">{JSON.stringify(blockInfo)}</div>
            </div>
          </div>
          <div className="middle_left_bottom">
            <div className="branch">
              <h2 className="branch_top">Branch {data && getBranch(2)}</h2>
              <div className="branch_middle">
                <div className="workingStatus">{otherStepState}</div>
                <div className="notification">Notification: 1</div>
              </div>
              <div className="branch_bottom">
                {isSentOther && JSON.stringify(blockInfo)}
              </div>
            </div>
            <div className="branch">
              <h2 className="branch_top">Branch {data && getBranch(3)}</h2>
              <div className="branch_middle">
                <div className="workingStatus">{otherStepState}</div>
                <div className="notification">Notification: 1</div>
              </div>
              <div className="branch_bottom">
                {isSentOther && JSON.stringify(blockInfo)}
              </div>
            </div>
          </div>
        </div>

        <div className="middle_right">
          <div className="middle_right1">
            <div className={`stepBlock ${stepCounter === 1 && "current"}`}>
              1. Data in selected branch <br /> <br />
              <div className="stepBlock__data">{JSON.stringify(data)}</div>
            </div>
            <button
              onClick={handleClick}
              className={`nextButton ${
                (stepCounter > 11 || stepCounter === 11) && "disabled"
              }`}
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
