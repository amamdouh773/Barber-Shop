import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const ADD_PRODUCT = gql`
  mutation insertProduct($newProduct: products_insert_input!) {
    insert_products_one(object: $newProduct) {
      name
      price
      product_code
    }
  }
`;

export const useAddProduct = () => {
  return useMutation(ADD_PRODUCT);
};
