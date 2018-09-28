import { graphql, commitMutation } from "react-relay";
import env from "./Enviroment"; 

//Mutation Query
const mutation = graphql`
  mutation UserAddMutation($input: UserAddInput!) {
    UserAdd(input: $input) {
      your_fields
    }
  }
`;

const commit = (email, name) => {
  //Parameters of our mutation
  const variables = {
    input: {
      email,
      name
      
    }
  };
  return new Promise((resolve, reject) => {
    commitMutation(env, { //Passing our enviroment
      mutation, //Here we pass our GraphQL mutation
      variables, //Passing our parameters
      onCompleted: (response, errors) => {
        console.log(response);
        resolve(response.UserAdd); // here you can resolve the User connection updated by the mutation and update your render
        alert('A new user has been added') // showing a alert to show that a new user has been added
      },
      onError: err => alert('An unexpected error occurred') // showing an alert to show that something happened in the backend
     });
  });
};

export default commit