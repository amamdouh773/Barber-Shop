import React, { useState } from "react";
import { ProductDetailsProps } from "./interfaces";
import "../styles/product-details.css";
import { useLocation } from "react-router";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useAddProduct } from "../hooks/useAddProduct";

export const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const { state: product } = useLocation();
  const { productCode, productName, productPrice, id } = (product ||
    {}) as ProductDetailsProps;

  const [newCode, updateProductCode] = useState("");
  const [newName, updateProductName] = useState("");
  const [newPrice, updateProductPrice] = useState(0);
  const [updateProduct] = useUpdateProduct();
  const [addProduct] = useAddProduct();
  React.useEffect(() => {
    updateProductCode(productCode);
    updateProductName(productName);
    updateProductPrice(productPrice);
  }, [productCode, productName, productPrice]);

  const getCode = (event: any) => {
    let input = event.target.value;
    updateProductCode(input);
  };

  const getName = (event: any) => {
    let input = event.target.value;
    updateProductName(input);
  };

  const getPrice = (event: any) => {
    let input = Number(event.target.value);
    if (input >= 0) updateProductPrice(input);
  };

  const editProduct = () => {
    const newProduct = {
      name: newName,
      price: newPrice,
      product_code: newCode,
    };

    updateProduct({ variables: { newProduct, id } })
      .then(console.log)
      .catch(console.error);
    alert("تمت العملية بنجاح");
  };

  const submitProduct = () => {
    const newProduct = {
      name: newName,
      price: newPrice,
      product_code: newCode,
    };

    addProduct({ variables: { newProduct } })
      .then(console.log)
      .catch(console.error);
    alert("تمت العملية بنجاح");
  };

  return (
    <div className="product-card">
      <div className="detail">
        <h3 className="laber">اسم المنتج</h3>
        <input type="text" value={newName} onChange={getName} />
        <h3 className="laber">سعر المنتج</h3>
        <input type="number" value={newPrice} onChange={getPrice} />
        <h3 className="laber">كود المنتج</h3>
        <input type="text" value={newCode} onChange={getCode} />
      </div>
      {id !== undefined ? (
        <button className="price-btn" onClick={editProduct}>
          تعديل المنتج
        </button>
      ) : (
        <button className="price-btn" onClick={submitProduct}>
          إضافة المنتج
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
