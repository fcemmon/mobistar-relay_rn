import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { QueryRenderer, graphql } from "react-relay";
import env from './Enviroment';
import ErrorView from './ErrorView';

class UserView extends Component {
  render() {
    const { name, email } = this.props.viewer
    return (
      <View>
        <Text>{name}</Text>
        <Text>{email}</Text>
      </View>
    );
  }
}

// creating the params for the user
const variables = {
  userId: 'cjb3neu7x0rle01130wksqy9w'
};

/* 
  Here is our GraphQL Query that receives a user_id and returns a name and a email
*/
const query = graphql`
    query MainRelayQuery ($user_id:ID!) {
        viewer {
            User(id:$user_id) {
              name
              email
            }
        }
    }
`;

// IMPORTANT: We need to 'export default' the query renderer to the query run
export default () => <QueryRenderer
  environment={env} //Here is the enviroment that we configured before
  variables={variables} //Passing the params/variables that we created
  query={query} //And here goes your GraphQL query
  render={
    ({error, props}) => {
      if (error) {
        //Here we pass our error view in case of query errors or fetch failture
        return (<ErrorView error={error} />);
      } else if (props) {
        //Here we pass our component that should be rendered
        return (<YourComponent {...props}/>);
      }
      //Here goes our activity indicator or loading view
      return (<ActivityIndicator >);
    }
  }
/>;