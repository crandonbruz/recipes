const typeDefs = `
type Recipie {
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
  recipies: [Recipie]
  recipieCount: Int
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
  saveRecipie(recepieData: recepieInput!): User
    removeRecipie(recipieId: ID!): User
}
`;
export default typeDefs;
