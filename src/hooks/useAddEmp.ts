import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const ADD_EMP = gql`
  mutation insertEmp($newEMp: employee_insert_input!) {
    insert_employee_one(object: $newEMp) {
      name
      phone
      salary
    }
  }
`;

export const useAddEmp = () => {
  return useMutation(ADD_EMP);
};
