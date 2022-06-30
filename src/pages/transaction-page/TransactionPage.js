import React, { useEffect, useState } from "react";
import "./TransactionPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";

const TransactionPage = () => {
  const [stepCounter, setStepCounter] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [otp, setOtp] = useState("");
  const [stepState, setStepState] = useState("Working status");
  const [otherStepState, setOtherStepState] = useState("Working status");
  const [blockInfo, setBlockInfo] = useState({});
  const [isSentOther, setIsSentOther] = useState(false);
  const [notification, setNotification] = useState("Notification");
  const [othersNotification, setOthersNotification] = useState("Notification");
  const [shouldAdd, setShouldAdd] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setData(location.state);
  }, []);

  const handleClick = () => {
    doTransactionStep();
    // console.log(setData({ ...data, timestamp: new Date() }));
  };

  const doTransactionStep = async () => {
    if (stepCounter === 1) {
      setStepState(`Data is here`);
    } else if (stepCounter === 2) {
      console.log("step 2");
      const res = await axios.get(`/transactions/${data.branch}/${data.acc}`);
      console.log(res.data);
      if (res.data.data === null) {
        setStepState(
          `Sorry!!😢 Data not found of Acc no ${data.acc}. Transaction canceled 😢`
        );
        setStepCounter((prevCount) => prevCount + 12);
        setIsCompleted(true);
      } else {
        setStepState(
          `Data found of Acc no ${res.data.data.acc} in Branch ${data.branch}`
        );
      }
    } else if (stepCounter === 3) {
      let otpInput = prompt("Enter your OTP ");
      setOtp(otpInput);
      setStepState(`Sent verification message`);
    } else if (stepCounter === 4) {
      setStepState(`Have the OTP and creating block`);
      const res = await axios.post(`/transactions/last`, {
        acc: data.acc,
        userNID: data.nid,
      });

      setBlockInfo({
        index: res.data.index + 1,
        ...data,
        timestamp: new Date(),
        otp: otp,
        prevHash: res.data.prevHash,
      });
    } else if (stepCounter === 5) {
      setIsSentOther(true);
      setStepState(`Sent to other branches to validate`);
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
        res1.data.data === res3.data.data //+ 1000
      ) {
        setOtherStepState(`Checked the journal and it is Yes`);
        setShouldAdd(true);
      } else {
        setOtherStepState(`Checked the journal and it is No. Something wrong`);
      }
    } else if (stepCounter === 7) {
      setOtherStepState(`Sent notification to Branch ${data.branch}`);

      if (shouldAdd) {
        setNotification(
          `Branch ${getBranch(2)} and Branch ${getBranch(
            3
          )} has confirmed the block. Please add the Block to BC`
        );
      } else {
        setNotification(
          `Branch ${getBranch(2)} and Branch ${getBranch(
            3
          )} has rejected the block. Something wrong`
        );
        setStepCounter((prevCount) => prevCount + 1);
      }
    } else if (stepCounter === 8) {
      // add to blockchain
      console.log("workin step 8");
      const res = await axios.post(
        `/transactions/add/${data.branch}`,
        blockInfo
      );
      console.log(res);
      setStepState(
        `Added the transaction to the blockchain of Acc no. ${data.acc}`
      );
      setStepCounter((prevCount) => prevCount + 1);
    } else if (stepCounter === 9) {
      // when rejected
      setStepState(`Transaction rejected`);
      setOtherStepState(`Transaction rejected`);
      setStepCounter((prevCount) => prevCount + 2);
      setIsCompleted(true);
    } else if (stepCounter === 10) {
      // send yes to all other branches
      setStepState(`Sent notification to other branches to add the block`);
      setOthersNotification(
        `Transaction has been added to the blockchain by Branch ${data.branch}`
      );
    } else if (stepCounter === 11) {
      // add to others and transaction is completed
      const res2 = await axios.post(
        `/transactions/add/${getBranch(2)}`,
        blockInfo
      );
      const res3 = await await axios.post(
        `/transactions/add/${getBranch(3)}`,
        blockInfo
      );
      console.log(res3);
      setStepState(`Transaction completed`);
      setOtherStepState(
        `Block added and transaction completed by Branch ${data.branch}. Congratulation 🔥 `
      );
      setIsCompleted(true);
    }
    setStepCounter((prevCount) => prevCount + 1);
    console.log(stepCounter);
  };

  const handleBackToHome = () => {
    navigate("/");
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
                <div className="notification">{othersNotification}</div>
              </div>
              <div className="branch_bottom">
                {isSentOther && JSON.stringify(blockInfo)}
              </div>
            </div>
            <div className="branch">
              <h2 className="branch_top">Branch {data && getBranch(3)}</h2>
              <div className="branch_middle">
                <div className="workingStatus">{otherStepState}</div>
                <div className="notification">{othersNotification}</div>
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
                // (stepCounter > 11 || stepCounter === 11) && "disabled"
                isCompleted && "disabled"
              }`}
            >
              Next Step
            </button>
            <button
              onClick={handleBackToHome}
              className={`nextButton ${!isCompleted && "disabled"}`}
            >
              Back to Home
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
