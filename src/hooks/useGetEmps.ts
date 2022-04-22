import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Employee } from "../components/interfaces";

const GET_ALL_EMPS = gql`
  query getAllEmps {
    employee {
      id
      name
      phone
      salary
    }
  }
`;

export const useGetEmps = () => {
  return useQuery<{ employee: Employee[] }>(GET_ALL_EMPS, {
    fetchPolicy: "network-only",
  });
};
