export default async (
  unused: object,
  { message }: { message: string },
  unusedContext: Context
): Promise<string> => {
  return `Hello, World!  With Message: ${message}`;
};
