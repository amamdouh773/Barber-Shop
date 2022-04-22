import "../styles/finaincial-page.css";
import { StatsInvoice, useGetStats } from "../hooks/useGetInvoiceItems";
import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../hooks/utils";

interface InvoicesAggregate {
  id: number;
  type: "product" | "service";
  name: string;
  quantity: number;
  price: number;
  discount: number;
  employee: StatsInvoice["employee"];
}

const calculateInvoiceAggregate = (
  invoices: StatsInvoice[]
): InvoicesAggregate[] => {
  const merge = (a: InvoicesAggregate, b?: InvoicesAggregate) =>
    !b
      ? a
      : {
          ...a,
          quantity: a.quantity + b.quantity,
          discount: a.discount + b.discount,
        };

  const aggregate = invoices
    .flatMap((invoice): InvoicesAggregate[] =>
      invoice.invoice_items.map((item) => ({
        id: item.product?.id || item.service.id,
        type: item.product ? "product" : "service",
        name: item.product?.name || item.service.name,
        quantity: item.quantity,
        price: item.price,
        discount: invoice.discount / invoice.invoice_items.length,
        employee: invoice.employee,
      }))
    )
    .reduce((p, c) => {
      const key = `${c.employee.id}_${c.type}_${c.price}`;
      return Object.assign(p, { [key]: merge(c, p[key]) });
    }, {} as Record<string, InvoicesAggregate>);

  return Object.values(aggregate);
};

const calculateEmployeeAggregate = (invoicesAggregate: InvoicesAggregate[]) => {
  return Object.values(
    invoicesAggregate.reduce(
      (p, c) =>
        Object.assign(p, {
          [c.employee.id]: {
            items: [c, ...(p[c.employee.id]?.items || [])],
            total: (p[c.employee.id]?.total || 0) + c.price * c.quantity,
            name: c.employee.name,
          },
        }),
      {} as Record<
        string,
        { items: InvoicesAggregate[]; total: number; name: string }
      >
    )
  );
};

export const FinancialPage = () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [startDate, setStartDate] = useState<string>(
    formatDate(todayStart) + " 00:00:00"
  );
  const [endDate, setEndDate] = useState<string>(
    formatDate(new Date()) +
      ` ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  );
  console.log(`startDate:${startDate} endDate:${endDate}`);
  const { data, loading, error } = useGetStats(startDate, endDate);
  const invoicesAggregate = useMemo(
    () => calculateInvoiceAggregate(data?.invoices || []),
    [data?.invoices]
  );

  let { totalIncome, discount } = useMemo(() => {
    return invoicesAggregate.reduce(
      (p, c) => ({
        totalIncome: c.quantity * c.price + p.totalIncome,
        discount: p.discount + c.discount,
      }),
      { totalIncome: 0, discount: 0 }
    );
  }, [invoicesAggregate]);

  let totalOutcome = useMemo(
    () => data?.withdraws.reduce((p, c) => p + c.amount, 0) || 0,
    [data?.withdraws]
  );
  const employeeAggregate = calculateEmployeeAggregate(invoicesAggregate);

  return loading ? (
    <>Loading...</>
  ) : error ? (
    <>{error.message}</>
  ) : data ? (
    <div className="finance-page">
      <div className="dates">
        <div className="date-picker">
          <label>تاريخ البداية</label>
          <DatePicker
            startDate={new Date(startDate)}
            onChange={(date: Date) => {
              setStartDate(formatDate(date));
            }}
            selected={new Date(startDate)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="date-picker">
          <label>تاريخ النهاية</label>
          <DatePicker
            startDate={new Date(endDate)}
            onChange={(date: Date) => {
              setEndDate(formatDate(date));
            }}
            selected={new Date(endDate)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
      </div>
      <div className="details-container">
        <div className="income">
          <h1>الوارد</h1>
          <div className="header">
            <h4>اسم المنتج</h4>
            <h4>الكمية</h4>
            <h4>السعر</h4>
            <h4>المجموع</h4>
          </div>

          <div className="order">
            {invoicesAggregate.map((order, i) => (
              <div key={i}>
                <h4>{order.name}</h4>
                <h4>{order.quantity}</h4>
                <h4>{order.price} LE</h4>
                <h4>{order.quantity * order.price} LE</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="outcome">
          <h1>المصروفات</h1>
          <div className="header">
            <h4>تفاصيل السحب</h4>
            <h4>المبلغ</h4>
          </div>
          <div className="order">
            {data.withdraws.map((withdraw, i) => {
              return (
                <div key={i}>
                  <h4>{withdraw.reason}</h4>
                  <h4>{withdraw.amount} LE</h4>
                </div>
              );
            })}
          </div>
        </div>
        <div className="employees">
          <h1>العمال</h1>
          {employeeAggregate.map((employee, i) => (
            <div className="emp-work" key={i}>
              <h1>العامل</h1>
              <div className="emp-work-header">
                <h3>:اسم العامل</h3>
                <h4>{employee.name}</h4>
                <h3>:المجموع</h3>
                <h4>{employee.total}</h4>
              </div>
              <div className="emp-work-details">
                <h1>الشغل</h1>
                <div className="header">
                  <h4>اسم المنتج</h4>
                  <h4>الكمية</h4>
                  <h4>السعر</h4>
                  <h4>المجموع</h4>
                </div>

                <div className="order">
                  {employee.items.map((order, i) => (
                    <div key={i}>
                      <h4>{order.name}</h4>
                      <h4>{order.quantity}</h4>
                      <h4>{order.price} LE</h4>
                      <h4>{order.quantity * order.price} LE</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="total-calcs">
        <div className="calc">
          <h2>مجموع الداخل</h2>
          <p>{totalIncome}</p>
        </div>
        <div className="calc">
          <h2>مجموع الخصم</h2>
          <p>{Math.round(discount)}</p>
        </div>
        <div className="calc">
          <h2>مجموع السحوبات</h2>

          <p>{totalOutcome}</p>
        </div>
        <div className="calc">
          <h2>صافي اليوم</h2>
          <p>{totalIncome - totalOutcome - Math.round(discount)}</p>
        </div>
      </div>
    </div>
  ) : (
    <>No Data</>
  );
};

export default FinancialPage;
