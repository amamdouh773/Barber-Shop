import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Product } from "../components/interfaces";

const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    products {
      id
      productName: name
      productPrice: price
      productCode: product_code
    }
  }
`;

export const useGetProducts = () => {
  return useQuery<{ products: Product[] }>(GET_ALL_PRODUCTS, {
    fetchPolicy: "network-only",
  });
};
