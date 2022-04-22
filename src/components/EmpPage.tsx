import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetEmps } from "../hooks/useGetEmps";
import "../styles/products-page.css";
export const EmpPage = () => {
  const { data: empsData, error, loading } = useGetEmps();
  const [empName, updateEmpName] = useState("");

  const getData = (event: any) => {
    let input = event.target.value;
    updateEmpName(input);
  };

  if (error) console.log(error);
  if (loading) console.log(loading);

  return (
    <div className="product-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="اكتب اسم العامل"
          style={{ direction: "rtl" }}
          onChange={getData}
        />
        <div className="products">
          <div className="heading">
            <h2>اسم العامل</h2>
            <h2>رقم التليفون</h2>
            <h2>المرتب</h2>
          </div>
          {empsData?.employee
            .filter((emp) =>
              emp.name.toLowerCase().startsWith(empName.toLowerCase())
            )
            .map((emp, i) => (
              <div className="product" key={i}>
                <h3>{emp.name}</h3>
                <h3>{emp.phone}</h3>
                <h3>{emp.salary}</h3>
                <div className="icons">
                  <Link
                    to={{
                      pathname: `/employees/${emp.id}`,
                      state: emp,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <img src="../img/details.svg" alt="details" />
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="add-item">
          <div className="icon">
            <Link
              to="employees/add-employee"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <img src="../img/add.svg" alt="details" />
            </Link>
          </div>
          <h2>إضافة عامل جديد</h2>
        </div>
      </div>
    </div>
  );
};

export default EmpPage;
