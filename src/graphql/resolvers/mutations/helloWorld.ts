export default async function(unused: object, { message }: { message: string }, context: Context): Promise<string> {
  return `Hello, World!  With Message: ${message}`;
};
