export default async function(unused: object, { message }: { message: string }, context: ApolloContext): Promise<string> {
  return `Hello, World!  With Message: ${message}`;
};
