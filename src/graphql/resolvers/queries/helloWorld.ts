export default async function(unused: object, variables: object, { session }: ApolloContext) {
  const { userId } = session;
  return `Hello, World!  From: ${userId}`;
};
