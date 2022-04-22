import React, { useState } from "react";
import { ProductsCardProps } from "./interfaces";
import "../styles/products-card.css";

const ProductsCard: React.FC<ProductsCardProps> = ({
  addProduct,
  products,
  imgURL,
}) => {
  const [itemCode, updateCode] = useState("");
  const [itemQuantity, updateQuantity] = useState(1);

  const handleCodeInput = (event: any) => {
    let input = event.target.value;
    updateCode(input);
  };

  const handleQuantityInput = (event: any) => {
    let input = Number(event.target.value);
    input < 0 ? updateQuantity(0) : updateQuantity(input);
  };

  const findItems = () => {
    products.map((item) =>
      item.productCode === itemCode
        ? addProduct({
            id: item.id,
            name: item.productName,
            price: item.productPrice,
            productCode: item.productCode,
            quantity: itemQuantity,
          })
        : true
    );
    updateQuantity(1);
    updateCode("");
  };

  return (
    <div className="service-card-container">
      <div className="service-img">
        <img src={imgURL} alt="service-img" />
      </div>
      <div className="product">
        <h2 className="product-name">المنتجــات</h2>
        <div className="product-details">
          <div className="inputs">
            <h3>كود المنتج</h3>
            <input
              type="text"
              name="itemInput"
              placeholder="كود المنتج"
              value={itemCode}
              className="discount-input"
              onChange={handleCodeInput}
            />
            <h3>العدد</h3>
            <input
              type="number"
              name="itemInput"
              value={itemQuantity}
              className="discount-input"
              onChange={handleQuantityInput}
            />
            <button className="price-btn" onClick={findItems}>
              إضافة منتج
            </button>
          </div>
        </div>
        <div className="service"></div>
      </div>
    </div>
  );
};

export default ProductsCard;
