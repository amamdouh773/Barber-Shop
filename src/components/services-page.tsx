import React, { useState } from "react";
import { useGetServices } from "../hooks/useGetServices";
import { useGetProducts } from "../hooks/useGetProducts";

import "../styles/service-page.css";
import Cashier from "./cashier";
import { OrderItem, ProductItem, withdraw } from "./interfaces";
import { ServiceCard } from "./service-card";
import Withdraw from "./withdraw";
import ProductsCard from "./products-card";
import { useAddOrder } from "../hooks/useAddOrder";
import { useAddWithdraw } from "../hooks/useAddWitdraw";

export const SevicesPage: React.FC = () => {
  const { data: servicesData } = useGetServices();
  const { data: productsData } = useGetProducts();
  const [addOrderToDB] = useAddOrder();
  const [addWithDrawToDB] = useAddWithdraw();
  const [orderItems, setOrders] = useState<OrderItem[]>([]);
  const [productItems, setProducts] = useState<ProductItem[]>([]);

  const addOrder = (order: OrderItem) => {
    setOrders(() => {
      const newData = [...orderItems, order];
      const predicate = (item: OrderItem) =>
        item.serviceId === order.serviceId && item.price === order.price;
      const matches = newData.filter(predicate);
      const _matches = newData.filter((item) => !predicate(item));

      return [
        ..._matches,
        matches.reduce(
          (p, c) => ({ ...p, ...c, quantity: c.quantity + (p.quantity || 0) }),
          {} as OrderItem
        ),
      ];
    });
  };

  const addProduct = (product: ProductItem) => {
    console.log(product);
    setProducts(() => {
      console.log(productItems);
      const newData = [...productItems, product];
      const predicate = (item: ProductItem) =>
        item.productCode === product.productCode;

      const matches = newData.filter(predicate);
      const _matches = newData.filter((item) => !predicate(item));

      return [
        ..._matches,
        matches.reduce(
          (p, c) => ({ ...p, ...c, quantity: c.quantity + (p.quantity || 0) }),
          {} as ProductItem
        ),
      ];
    });
  };

  const deleteOrder = (index: number) => {
    setOrders([...orderItems.slice(0, index), ...orderItems.slice(index + 1)]);
  };

  const deleteProduct = (index: number) => {
    setProducts([
      ...productItems.slice(0, index),
      ...productItems.slice(index + 1),
    ]);
  };

  const finalizeOrder = (discount: number, empId: number | null) => {
    const invoice = {
      admin_id: 1,
      direction: 1,
      emp_id: empId,
      discount: discount,
      invoice_items: {
        data: [
          ...orderItems.map((order) => {
            return {
              quantity: order.quantity,
              price: order.price,
              service_id: order.serviceId,
            };
          }),
          ...productItems.map((product) => {
            return {
              quantity: product.quantity,
              price: product.price,
              product_id: product.id,
            };
          }),
        ],
      },
    };

    addOrderToDB({ variables: { invoice } })
      .then(console.log)
      .catch(console.error);
    setOrders([]);
    setProducts([]);
  };

  const addWithdraw = (withdrawItem: withdraw) => {
    const withdraw = {
      reason: withdrawItem.description,
      amount: withdrawItem.price,
      admin_id: 1,
    };
    addWithDrawToDB({ variables: { withdraw } });
  };
  return (
    <div className="services-page">
      <div className="services">
        {servicesData?.services.map((service, i) => (
          <div className="service-item" key={i}>
            <ServiceCard service={service} addOrder={addOrder} />
          </div>
        ))}
        <ProductsCard
          addProduct={addProduct}
          products={productsData?.products || []}
          imgURL=".\img\hairstyle.svg"
        />
      </div>
      <div className="cash-container">
        <Cashier
          orders={orderItems}
          products={productItems}
          deleteProduct={deleteProduct}
          finalizeOrder={finalizeOrder}
          deleteOrder={deleteOrder}
        />
        <Withdraw addWithdraw={addWithdraw} />

        <div className="cashier-container">
          <h2>إنهاء الحساب اليومي</h2>
          <button className="submit-order">إنهاء اليوم</button>
        </div>
      </div>
    </div>
  );
};

export default SevicesPage;
