import React, { useState } from "react";
import "./LoanCalc.css";

const LoanCalc = () => {
  // state of application
  const [userInput, setUserInput] = useState({
    amount: "",
    interest: "",
    years: "",
  });

  const [calculatedInput, setCalculatedInput] = useState({
    monthlyPayment: "",
    totalPayment: "",
    totalInterest: "",
    getResult: false,
  });

  const [error, setError] = useState("");

  // Handlers...
  const handleInputChange = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError("");
      calculateResults(userInput);
    }
  };

  // logic of application
  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

      setCalculatedInput({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        getResult: true,
      });
    }
    return;
  };
  const isValid = () => {
    const { amount, interest, years } = userInput;
    let throwError = "";

    if (!amount || !interest || !years) {
      throwError = " All values are required";
    }

    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
      throwError = " All values must be a valid number";
    }

    if (Number(amount) <= 0 || Number(interest) <= 0 || Number(years) <= 0) {
      throwError = " All values are required";
    }

    if (throwError) {
      setError(throwError);
      return false;
    }
    return true;
  };

  // Clear inputs on refresh
  const clearInput = () => {
    setUserInput({
      amount: "",
      interest: "",
      years: "",
    });

    setCalculatedInput({
      monthlyPayment: "",
      totalPayment: "",
      totalInterest: "",
      getResult: false,
    });
  };
  return (
    <>
      <h4>Loan Calculator</h4>
      <p className="error">{error}</p>
      <form onSubmit={handleSubmitValues}>
        {!calculatedInput.getResult ? (
          <div>
            {/* Amount */}
            <div>
              <label>Amount:</label>
              <input
                type={"text"}
                name="amount"
                placeholder="Enter an amount..."
                value={userInput.amount}
                onChange={handleInputChange}
                className="userInput"
              />
              <span>dollars($)</span>
            </div>
            {/* Interest */}
            <div>
              <label>Interest:</label>
              <input
                type={"text"}
                name="interest"
                placeholder="Enter an interest rate..."
                value={userInput.interest}
                onChange={handleInputChange}
                className="userInput"
              />
              <span>%</span>
            </div>
            {/* Years */}
            <div>
              <label>Years:</label>
              <input
                type={"text"}
                name="years"
                placeholder="Enter a number of years... "
                value={userInput.years}
                onChange={handleInputChange}
                className="userInput"
              />
              <span>years</span>
            </div>
            <input type="submit" className="buttonInput" />
          </div>
        ) : (
          <div>
            <h3>
              Loan amount: ${userInput.amount}
              <br />
              Interest: ${userInput.interest}
              <br />
              Years to repay: ${userInput.years}
              <br />
            </h3>
            <div>
              <label>Monthly Payment:</label>
              <input
                type={"text"}
                value={calculatedInput.monthlyPayment}
                className="userInput"
                disabled
              />
              <span>dollars($)</span>
            </div>
            <div>
              <label>Total Payment:</label>
              <input
                type={"text"}
                value={calculatedInput.totalPayment}
                className="userInput"
                disabled
              />
              <span>dollars($)</span>
            </div>
            <div>
              <label>Total Interest:</label>
              <input
                type={"text"}
                value={calculatedInput.totalInterest}
                className="userInput"
                disabled
              />
              <span>%</span>
            </div>
          </div>
        )}
        <input
          value={"Refresh"}
          type="button"
          onClick={clearInput}
          className="buttonInput"
        />
      </form>
    </>
  );
};
export default LoanCalc;
