const requireQueries = require.context('./queries', true, /\.js$/);
const requireMutations = require.context('./mutations', true, /\.js$/);

interface Resolvers {
  Query: {
    [key: string]: Function
  }
  Mutation: {
    [key: string]: Function
  }
}

const exportedFunctions: Resolvers = {
  Query: {},
  Mutation: {},
};

requireQueries.keys().forEach((file: string) => {
  const queryName = file.replace(/\.\//, '').replace(/\.js/, '');
  const queryFunc = requireQueries(file).default;
  exportedFunctions.Query[queryName] = queryFunc;
});

requireMutations.keys().forEach((file: string) => {
  const mutationName = file.replace(/\.\//, '').replace(/\.js/, '');
  const mutationFunc = requireMutations(file).default;
  exportedFunctions.Mutation[mutationName] = mutationFunc;
});

export default exportedFunctions;
