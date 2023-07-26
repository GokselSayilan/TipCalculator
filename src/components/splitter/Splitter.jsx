import React, { useState, useRef, useEffect } from "react";
import "./splitter.css";
import 'animate.css';

function Splitter() {
  const [amount, setAmount] = useState("0.00");
  const [total, setTotal] = useState("0.00");
  const [person, setPerson] = useState(0);
  const [selectedTip, setSelectedTip] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [bill, setBill] = useState(0);

  const billInputRef = useRef(null);
  const personInputRef = useRef(null);

  const tipArray = [5,10,15,25,50]

  const handleBillFocus = () => {
    billInputRef.current.select();
  };

  const handlePersonFocus = () => {
    personInputRef.current.select();
  };

  useEffect(() => {
    if (bill !== 0 && person !== 0) {
        setAmount(((bill/100*selectedTip)/person).toFixed(2))
        setTotal(((bill / person) + (bill/100*selectedTip)/person).toFixed(2));
    }
  }, [bill, person,selectedTip]);

  useEffect(() => {
    if (isNaN(total)) setTotal("0.00");
    if (total > 100000) setTotal("0.00");
  }, [total]);

  useEffect(() => {
    if (isNaN(amount)) setAmount("0.00");
    if (amount > 100000) setAmount("0.00");
  }, [amount]);

  return (
    <div className="splitter">
      <div className="splitterWrapper">
      <div className="splitterTitle">
            <h1 className="splitterText animate__animated animate__fadeInLeft">SPLI</h1>
            <h1 className="splitterText animate__animated animate__fadeInRight">TTER</h1>
          </div>
        <div className="splitterCard animate__animated animate__fadeIn">

          <div className="splitterCardLeft">
            <div className="splitterCardLeftBill">
              <h3 className="splitterCardLeftBillTitle">Bill</h3>
              <div className="splitterCardLeftBillValue">
                <img
                  src="assets/images/icon-dollar.svg"
                  alt=""
                  className="splitterCardLeftBillValueIcon"
                />
                <input
                  type="number"
                  className="splitterCardLeftBillValueInput"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  onFocus={handleBillFocus}
                  ref={billInputRef}
                />
              </div>
            </div>
            <div className="splitterCardLeftTip">
              <h3 className="splitterCardLeftTipTitle">Select Tip %</h3>
              <div className="splitterCardLeftTipBoxs">
                {tipArray.map((tip) => (
                <div
                key={tip+'abc'}
                className={tip===selectedTip ? 'splitterCardLeftTipBox splitterCardLeftTipBoxSelected' : 'splitterCardLeftTipBox'}
                onClick={() => {
                    setSelectedTip(tip)
                    setIsSelected(true)
                } }
              >
                {tip}%
              </div>
                ))}
                <input
                  type="number"
                  className="splitterCardLeftCustomBox"
                  placeholder="Custom"
                  value={isSelected ? "" : selectedTip}
                  onChange={(e)=> setSelectedTip(e.target.value)}
                  onFocus={() => setIsSelected(false)}
                />
              </div>
            </div>
            <div className="splitterCardLeftPeople">
              <h3 className="splitterCardLeftPeopleTitle">Number of People</h3>
              <div className="splitterCardLeftPeopleValue">
                <img
                  src="assets/images/icon-person.svg"
                  alt=""
                  className="splitterCardLeftPeopleValueIcon"
                />
                <input
                  type="number"
                  className="splitterCardLeftPeopleValueInput"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                  onFocus={handlePersonFocus}
                  ref={personInputRef}
                />
              </div>
            </div>
          </div>
          <div className="splitterCardRight">
            <div className="splitterCardRightTipAmount">
              <div className="splitterCardRightTipAmountLeft">
                <h3 className="splitterCardRightTipAmountLeftTop">
                  Tip Amount
                </h3>
                <h3 className="splitterCardRightTipAmountLeftBottom">
                  / person
                </h3>
              </div>
              <div className="splitterCardRightTipAmountRight">
                <h3 className="splitterCardRightTipAmountRightPrice">
                  ${amount}
                </h3>
              </div>
            </div>
            <div className="splitterCardRightTotal">
              <div className="splitterCardRightTotalLeft">
                <h3 className="splitterCardRightTotalLeftTop">Total</h3>
                <h3 className="splitterCardRightTipTotalLeftBottom">
                  / person
                </h3>
              </div>
              <div className="splitterCardRightTotalRight">
                <h3 className="splitterCardRightTotalRightPrice">${total}</h3>
              </div>
            </div>
            <div className="splitterCardRightButtonWrapper">
              <button
                className={
                  bill === 0 || person === 0
                    ? "splitterCardRightButton passiveButton"
                    : "splitterCardRightButton"
                }
                onClick={() => {
                  setBill(0);
                  setPerson(0);
                  setTotal("0.00");
                  setAmount("0.00");
                  setSelectedTip(0);
                }}
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Splitter;
