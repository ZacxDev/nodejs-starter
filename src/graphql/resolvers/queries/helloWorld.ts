export default async function(unused: object, variables: object, { session }: ApolloContext): Promise<string> {
  const { userId } = session;
  return `Hello, World!  From: ${userId}`;
};
