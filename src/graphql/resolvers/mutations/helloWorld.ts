export default async function(unused: object, { message }:{ message: String }, context: ApolloContext) {
  return `Hello, World!  With Message: ${message}`;
};
