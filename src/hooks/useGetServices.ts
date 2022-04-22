import { gql, useQuery } from "@apollo/client";
import { Service } from "../components/interfaces";

const GET_ALL_SERVICES = gql`
  query getAllServices {
    services {
      id
      imgURL: img_url
      serviceName: name
      servicePrices: prices
    }
  }
`;

export const useGetServices = () => {
  return useQuery<{ services: Service[] }>(GET_ALL_SERVICES);
};
