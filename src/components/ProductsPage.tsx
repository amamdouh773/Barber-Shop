import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProducts } from "../hooks/useGetProducts";
import "../styles/products-page.css";
export const ProductPage = () => {
  const { data: productsData, error, loading } = useGetProducts();
  const [productCode, updateProductCode] = useState("");

  const getData = (event: any) => {
    let input = event.target.value;
    updateProductCode(input);
  };

  if (error) console.log(error);
  if (loading) console.log(loading);

  return (
    <div className="product-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="اكتب كود المنتج"
          style={{ direction: "rtl" }}
          onChange={getData}
        />
        <div className="products">
          <div className="heading">
            <h2>اسم المنتج</h2>
            <h2>سعر المنتج</h2>
          </div>
          {productsData?.products
            .filter((product) => product.productCode.startsWith(productCode))
            .map((product, i) => (
              <div className="product" key={i}>
                <h3>{product.productName}</h3>
                <h3>{product.productPrice}</h3>
                <div className="icons">
                  <Link
                    to={{
                      pathname: `/products/${product.id}`,
                      state: product,
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
              to="products/add-product"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <img src="../img/add.svg" alt="details" />
            </Link>
          </div>
          <h2>إضافة منتج جديد</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
