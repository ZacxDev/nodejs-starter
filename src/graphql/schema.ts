export default `
type Query {
  helloWorld: Int!
}

type Mutation {
  helloWorld(message: String!): Int!
}
`;
