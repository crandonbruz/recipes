import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_recipe = gql`
  mutation saverecipe($recipeData: recipeInput!) {
    saverecipe(recipeData: $recipeData) {
      _id
      username
      email
      savedrecipes {
        title
        image
        ingredients
        instructions
      }
    }
  }
`;

export const REMOVE_recipe = gql`
  mutation removerecipe($recipeId: ID!) {
    removerecipe(recipeId: $recipeId) {
      _id
      username
      email
      savedrecipes {
        title
        image
        ingredients
        instructions
      }
    }
  }
`;
