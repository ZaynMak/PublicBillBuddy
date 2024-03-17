import { gql } from '@apollo/client';

const getPerson = gql`
  query person($id: ID!) {
    person(id: $id) {
      name
      amount
      paid
    }
  }
`;

const getBill = gql`
  query bill($id: ID!) {
    bill(id: $id) {
      name
      amount
      organizer {
        id
        name
        amount
        paid
      }
      participants {
        id
        name
        amount
        paid
      }
    }
  }
`;

const createPerson = gql`
  mutation createPerson($name: String!, $amount: String!) {
    createPerson(name: $name, amount: $amount) {
      person {
        id
      }
    }
  }
`;

const createBill = gql`
  mutation createBill($name: String!, $amount: String!, $organizer: ID!, $participants: [ID]!) {
    createBill(name: $name, amount: $amount, organizer: $organizer, participants: $participants) {
      bill {
        id
      }
    }
  }
`;

const updatePerson = gql`
  mutation updatePerson($id: ID!) {
    updatePerson(id: $id) {
      completed
    }
  }
`;

const deleteBill = gql`
  mutation deleteBill($id: ID!) {
    deleteBill(id: $id) {
      ok
    }
  }
`;

const deletePerson = gql`
  mutation deletePerson($id: ID!) {
    deletePerson(id: $id) {
      ok
    }
  }
`;

export { getPerson, getBill, createPerson, createBill, updatePerson, deleteBill, deletePerson }