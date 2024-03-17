import createApolloClient from "./apollo-client";

const getPerson = async () => {
  const client = createApolloClient();
  const data = await client.query({
    query: gql`
      query person($id, ID!) {
        person(id: $id) {
          name
          amount
          paid
        }
      }
    `,
  });
  return data;
}

const getBill = async () => {
  const client = createApolloClient();
  const data = await client.query({
    query: gql`
      query bill($id, ID!) {
        bill(id: $id) {
          name
          amount
          organizer
          participants
        }
      }
    `,
  });
  return data;
}

const createPerson = async () => {
  const client = createApolloClient();
  const data = await client.mutate({
    mutation: gql`
      mutation createPerson($name, String!, $amount, Int!) {
        createPerson(name: $name, amount, $amount) {
          person {
            name
          }
        }
      }
    `,
  });
  return data;
}

const createBill = async () => {
  const client = createApolloClient();
  const data = await client.mutate({
    mutation: gql`
      mutation createBill($name, String!, $amount, Int!) {
        createBill(name: $name, amount, $amount) {
          bill {
            name
          }
        }
      }
    `,
  });
  return data;
}

const updatePerson = async () => {
  const client = createApolloClient();
  const data = await client.mutate({
    mutation: gql`
      mutation updatePerson($id, ID!) {
        updatePerson(id: $id) {
          person {
            completed
          }
        }
      }
    `,
  });
  return data;
}

const deleteBill = async () => {
  const client = createApolloClient();
  const data = await client.mutate({
    mutation: gql`
      mutation deleteBill($id, ID!) {
        deleteBill(id: $id) {
          ok
        }
      }
    `,
  });
  return data;
}

const deletePerson = async () => {
  const client = createApolloClient();
  const data = await client.mutate({
    mutation: gql`
      mutation deletePerson($id, ID!) {
        deletePerson(id: $id) {
          ok
        }
      }
    `,
  });
  return data;
}

export { getPerson, getBill, createPerson, createBill, updatePerson, deleteBill, deletePerson }