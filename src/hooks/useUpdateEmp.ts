import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const UPDATE_EMP = gql`
  mutation updateEmp($id: Int!, $newEmp: employee_set_input!) {
    update_employee_by_pk(pk_columns: { id: $id }, _set: $newEmp) {
      id
      name
      phone
      salary
    }
  }
`;

export const useUpdateEmp = () => {
  return useMutation(UPDATE_EMP);
};
