const typeDefs = `
type recipe {
    _id: ID
  title: String
  ingredients: String
  instructions: String
  servings: String
}
type User {
    _id: ID
  username: String
  email: String
  password: String
  recipes: [recipe]
  recipeCount: Int
}
type Auth {
    token: ID
  user: User
}
type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveRecipe(recepieData: recepieInput!): User
    removeRecipe(recipeId: ID!): User
}
`;
export default typeDefs;
