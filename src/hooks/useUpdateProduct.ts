import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const UPDATE_PRODUCT = gql`
  mutation updateProducts($id: Int!, $newProduct: products_set_input!) {
    update_products_by_pk(pk_columns: { id: $id }, _set: $newProduct) {
      id
      name
      price
      product_code
    }
  }
`;

export const useUpdateProduct = () => {
  return useMutation(UPDATE_PRODUCT);
};
