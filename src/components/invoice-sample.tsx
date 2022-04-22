import { Order } from "./interfaces";

export const InvoiceSample = ({
  discount,
  orderArr,
  products,
  empName,
}: Omit<Order, "empId"> & { empName: string }) => {
  let total = 0;
  return ` 
  <style>
  .invoice-container {
    
    background-color: var(--secondry-color);
    margin-block-end: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
.invoice-container .logo{
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}


  .invoice-container .orders {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .invoice-container .orders .header
  {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-around;
  }
  .invoice-container .orders .order {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-around;
  }
  
  .invoice-container .orders .header h2{
    width: 85px;
  }
  .invoice-container .orders .order h3 {
    width: 85px;
  }

  .invoice-container .orders .footer{
    margin-block-start: 20px;
  }
  .invoice-container .orders .footer .total {
    margin-inline: 20px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-around;
  }
  
  .invoice-container .orders .footer .total h2 {
    margin-inline-start: 40px;
    margin-block: 3px;
}
 
.invoice-container .orders .footer .total h3{
  margin-inline-start: 40px;
    margin-block: 3px;
}

.invoice-container .orders .footer .price-total {
  margin-inline: 20px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-around;
}

.invoice-container .orders .footer .price-total h2 {
  margin-inline-start: 40px;
  margin-block: 3px;
}

.invoice-container .orders .footer .price-total h3{
margin-inline-start: 40px;
  margin-block: 3px;
}

</style>
  <div class="invoice-container">
      <div class="logo">
        <img src="../img/logo.png" alt="logo.png not found" />

      </div>
      <div class="orders">
        <div class="header">
          <h2>الصنف</h2>
          <h2>الكمية</h2>
          <h2>السعر</h2>
          <h2>المجموع</h2>
        </div>
        <div class="order-items">
          ${orderArr
            .map((order, i) => {
              total += order.price * order.quantity;
              return `<div class="order" key=${i}> 
                <h3>${order.name}</h3>
                <h3>${order.quantity}</h3>
                <h3>${order.price}</h3>
                <h3>${order.quantity * order.price}</h3>
              </div>`;
            })
            .join("")}
          ${products
            .map((order, i) => {
              total += order.quantity * order.price;
              return `<div class="order" key=${i}>
              <h3>${order.name}</h3>
              <h3>${order.quantity}</h3>
              <h3>${order.quantity}</h3>
              <h3>${order.quantity * order.price}</h3>
            </div>`;
            })
            .join("")}
        </div>
        <div class="footer">
          <div class="total">
            <h3>الاجمالي</h3>
            <h3>${total}</h3>
          </div>

          <div class="total">
            <h3>الخصم</h3>
            <h3>${discount}</h3>
          </div>

          <div class="price-total">
            <h2>الصافي</h2>
            <h2>${total - discount}</h2>
          </div>
          
          
        </div>
        <div class="footer">
        <div class="total">
            <h2>المصفف</h2>
            <h3>${empName}</h3>
          </div>
          <div class="total">
            <h2>التاريخ</h2>
            <h3>${new Date().toLocaleString()}</h3>
          </div>
            </div>
        <div class="logo">
        <img src="../img/temp.png" alt="logo.png not found" />

      </div>
      </div>
    </div>`;
};

export default InvoiceSample;
