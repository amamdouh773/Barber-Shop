import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const ADD_ORDER = gql`
  mutation insertInvoice($invoice: invoices_insert_input!) {
    insert_invoices_one(object: $invoice) {
      admin_id
      date
      direction
      emp_id
      id
    }
  }
`;

export const useAddOrder = () => {
  return useMutation(ADD_ORDER);
};
