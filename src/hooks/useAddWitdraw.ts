import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const ADD_WITHDRAW = gql`
  mutation insertWithdraw($withdraw: withdraws_insert_input!) {
    insert_withdraws_one(object: $withdraw) {
      admin_id
      date
      amount
      reason
      id
    }
  }
`;

export const useAddWithdraw = () => {
  return useMutation(ADD_WITHDRAW);
};
