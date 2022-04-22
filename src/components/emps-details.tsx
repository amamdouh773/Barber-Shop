import React, { useState } from "react";
import { EmpDetailsProps } from "./interfaces";
import "../styles/product-details.css";
import { useLocation } from "react-router";
import { useAddEmp } from "../hooks/useAddEmp";
import { useUpdateEmp } from "../hooks/useUpdateEmp";

export const EmpDetails: React.FC<EmpDetailsProps> = () => {
  const { state: product } = useLocation();
  const { id, name, phone, salary } = (product || {}) as EmpDetailsProps;

  const [newPhone, updatePhone] = useState("");
  const [newName, updateName] = useState("");
  const [newSalary, updateSalary] = useState(0);
  const [addEmp] = useAddEmp();
  const [updateEmp] = useUpdateEmp();

  React.useEffect(() => {
    updatePhone(phone);
    updateName(name);
    updateSalary(salary);
  }, [phone, name, salary]);

  const getPhone = (event: any) => {
    let input = event.target.value;
    updatePhone(input);
  };

  const getName = (event: any) => {
    let input = event.target.value;
    updateName(input);
  };

  const getPrice = (event: any) => {
    let input = Number(event.target.value);
    if (input >= 0) updateSalary(input);
  };

  const editEmp = () => {
    const newEmp = {
      name: newName,
      salary: newSalary,
      phone: newPhone,
    };

    updateEmp({ variables: { newEmp, id } })
      .then(console.log)
      .catch(console.error);
    alert("تمت العملية بنجاح");
  };

  const submitEmp = () => {
    const newEMp = {
      name: newName,
      salary: newSalary,
      phone: newPhone,
    };

    addEmp({ variables: { newEMp } }).then(console.log).catch(console.error);
    alert("تمت العملية بنجاح");
  };

  return (
    <div className="product-card">
      <div className="detail">
        <h3 className="laber">اسم العامل</h3>
        <input type="text" value={newName} onChange={getName} />
        <h3 className="laber">مرتب العامل</h3>
        <input type="number" value={newSalary} onChange={getPrice} />
        <h3 className="laber">تليفون العامل</h3>
        <input type="text" value={newPhone} onChange={getPhone} />
      </div>
      {id !== undefined ? (
        <button className="price-btn" onClick={editEmp}>
          تعديل بيانات العامل
        </button>
      ) : (
        <button className="price-btn" onClick={submitEmp}>
          إضافة عامل جديد
        </button>
      )}
    </div>
  );
};

export default EmpDetails;
