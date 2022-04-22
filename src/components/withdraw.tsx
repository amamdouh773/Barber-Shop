import React, { useState } from "react";
import "../styles/cashier.css";
import "../styles/withdraw.css";
import { WithdrawProps } from "./interfaces";

export const Withdraw: React.FC<WithdrawProps> = ({ addWithdraw }) => {
  const [withdrawName, updatWithdrawName] = useState("");
  const [withdrawPrice, updatWithdrawPrice] = useState(0);
  const getName = (event: any) => {
    let name = event.target.value;
    updatWithdrawName(name);
  };
  const getPrice = (event: any) => {
    let price = Number(event.target.value);
    price < 0 ? (price = 0) : updatWithdrawPrice(price);
  };

  const handleAddWithdraw = () => {
    addWithdraw({ price: withdrawPrice, description: withdrawName });
    updatWithdrawPrice(0);
    updatWithdrawName("");
  };

  return (
    <div className="cashier-container">
      <h2>تفاصيل السحب</h2>
      <div className="withdraw-container">
        <div className="withdraw">
          <h4>تفاصيل العملية</h4>
          <input
            type="text"
            name="discount-name"
            placeholder="تفاصيل العملية....."
            value={withdrawName}
            className="discount-input"
            onChange={getName}
          />
          <h4>سعر العملية</h4>
          <input
            type="number"
            name="dicount-price"
            value={withdrawPrice}
            className="discount-input"
            onChange={getPrice}
          />
        </div>
        <button className="submit-order" onClick={handleAddWithdraw}>
          تأكيد الطلب
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
