import React, { useState } from "react";
import "../styles/service-card.css";
import { ServiceCardProps } from "./interfaces";
import { OrderItem } from "./interfaces";

export const ourOrders: OrderItem[] = [];
export const ServiceCard: React.FC<ServiceCardProps> = ({
  service: { imgURL, serviceName, servicePrices, id },

  addOrder,
}) => {
  const [priceInput, changeInput] = useState(0);

  function updatePrice(event: any) {
    let price = Number(event.target.value);
    price < 0 ? (price = 0) : changeInput(price);
  }

  const handleAddPrice = (price: number) => (_: any) => {
    changeInput(0);

    addOrder({ name: serviceName, price, serviceId: id, quantity: 1 });
  };

  return (
    <div className="service-card-container">
      <div className="service-img">
        <img src={imgURL} alt="service-img" />
      </div>
      <div className="service">
        <h2 className="service-name">{serviceName}</h2>
        <div className="prices">
          {servicePrices.length !== 0 ? (
            servicePrices.map((price, i) => (
              <div className="service-price" key={i}>
                <button className="price-btn" onClick={handleAddPrice(price)}>
                  {price + " LE"}
                </button>
              </div>
            ))
          ) : (
            <div className="variable-price">
              <input
                type="number"
                name="price"
                className="price-input"
                value={priceInput}
                onChange={updatePrice}
              />
              <button
                className="price-btn"
                onClick={handleAddPrice(priceInput)}
              >
                أكد السعر
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
