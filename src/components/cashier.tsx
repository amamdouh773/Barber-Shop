import React, { useRef, useState } from "react";
import { useGetEmps } from "../hooks/useGetEmps";
import "../styles/cashier.css";
import { CashierProps, OrderItem, ProductItem } from "./interfaces";
import InvoiceSample from "./invoice-sample";

export const Cashier: React.FC<CashierProps> = ({
  orders,
  deleteProduct,
  products,
  finalizeOrder,
  deleteOrder,
}) => {
  const { data: empsData } = useGetEmps();
  var total = 0;
  const [discount, updateDiscount] = useState(0);
  const [selectedValue, updateSelection] = useState("");
  const [flag, toggleFlag] = useState(false);
  const [selectedEmp, updateSelectedEmp] = useState(0);

  const componentRef = useRef(null);

  const handleSelectionChange = (event: any) => {
    updateSelection(event.target.value);
    empsData?.employee.map((emp) =>
      emp.name === event.target.value ? updateSelectedEmp(emp.id) : true
    );
  };

  const getData = (event: any) => {
    let discountPrice = Number(event.target.value);
    discountPrice > 0 && discountPrice <= total
      ? updateDiscount(discountPrice)
      : (discountPrice = 0);
  };

  const _openPrint = () => {
    const newWindow = window.open("");
    const name = empsData?.employee
      .map((emp) => (emp.id === selectedEmp ? emp.name : ""))
      .toString()
      .replaceAll(",", "");
    console.log(name);
    newWindow?.document.write(
      InvoiceSample({
        products,
        orderArr: orders,
        discount,
        empName: name || "",
      })
    );
    setTimeout(() => {
      newWindow?.print();
      // newWindow?.close();
    }, 100);
  };

  const _finalizeOrder = () => {
    if (selectedEmp === 0) {
      alert("من فضلك اختار موظف");
    } else {
      _openPrint();
      toggleFlag(!flag);
      finalizeOrder(discount, selectedEmp);
      updateDiscount(0);
      updateSelection("");
      updateSelectedEmp(0);
    }
  };

  return (
    <div className="cashier-container">
      <h2>تفاصيل الطلب</h2>
      <div className="order-container">
        {/* orderItems */}
        {orders.map((order: OrderItem, i: number) => (
          <div className="order" key={i}>
            <div
              style={{
                display: "none",
              }}
            >
              {(total += order.price * order.quantity)}
            </div>
            <h4>{order.name}</h4>
            <p>{order.price * order.quantity + " LE"}</p>
            <div className="delete-container" onClick={() => deleteOrder(i)}>
              <img src="./img/trash.svg" alt="delete" />
            </div>
          </div>
        ))}
        {products.map((order: ProductItem, i: number) => (
          <div className="order" key={i}>
            <div
              style={{
                display: "none",
              }}
            >
              {(total += order.price * order.quantity)}
            </div>
            <h4>{order.name}</h4>
            <p>{order.price * order.quantity + " LE"}</p>
            <div className="delete-container" onClick={() => deleteProduct(i)}>
              <img src="./img/trash.svg" alt="delete" />
            </div>
          </div>
        ))}
        {/* discount */}
        <div className="order">
          <h4>خصم</h4>
          <input
            type="number"
            name="discount"
            value={discount}
            className="discount-input"
            onChange={getData}
          />
        </div>

        {/* employees */}
        <div className="order">
          <h3>إختر الموظف</h3>
          <select
            className="selection"
            value={selectedValue}
            onChange={handleSelectionChange}
          >
            <option value={""} disabled>
              اسم الموظـــف....
            </option>
            {empsData?.employee.map((emp) => (
              <option key={emp.id} value={emp.name}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>
        {/**totals */}
        <div className="order">
          <h4>المجموع قبل الخصم</h4>
          <p>{total}</p>
        </div>
        <div className="order">
          <h4>المجموع بعد الخصم</h4>
          <p>{total - discount}</p>
        </div>
      </div>
      <div className="btns">
        <button className="submit-order" onClick={_finalizeOrder}>
          تأكيد الطلب
        </button>
      </div>
      <div className="invoice-container">
        <div className="invoice-simulator" ref={componentRef}></div>
      </div>
    </div>
  );
};

export default Cashier;
