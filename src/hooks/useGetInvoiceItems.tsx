import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_INVOICE_STATS = gql`
  query getInvoices($startDate: timestamp!, $endDate: timestamp!) {
    invoices(
      where: {
        date: { _gte: $startDate, _lte: $endDate }
        direction: { _eq: 1 }
      }
    ) {
      id
      discount
      date
      employee {
        id
        name
      }
      invoice_items {
        id
        price
        quantity
        service {
          id
          name
        }
        product {
          id
          name
        }
      }
    }
    withdraws(where: { date: { _gte: $startDate, _lte: $endDate } }) {
      id
      amount
      date
      reason
    }
  }
`;

interface Employee {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

interface InvoiceItem {
  id: number;
  price: number;
  quantity: number;
  service: Service;
  product?: Product;
}

export interface StatsInvoice {
  id: number;
  discount: number;
  date: Date;
  employee: Employee;
  invoice_items: InvoiceItem[];
}

export interface StatWithdraw {
  id: number;
  amount: number;
  date: string;
  reason: string;
}

interface Response {
  invoices: StatsInvoice[];
  withdraws: StatWithdraw[];
}

export const useGetStats = (startDate: string, endDate: string) =>
  useQuery<Response>(GET_INVOICE_STATS, {
    fetchPolicy: "network-only",
    variables: { startDate, endDate },
  });
