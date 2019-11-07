export default async function(unused, unusedVars, { session }) {
  const { userId } = session;
  return `Hello, World!  From: ${userId}`;
};
