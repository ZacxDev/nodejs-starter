const requireQueries = require.context('./queries', true, /\.js$/);
const requireMutations = require.context('./mutations', true, /\.js$/);

const exportedFunctions = {
  Query: {},
  Mutation: {},
};

requireQueries.keys().forEach(file => {
  const queryName = file.replace(/\.\//, '').replace(/\.js/, '');
  const queryFunc = requireQueries(file).default;
  exportedFunctions.Query[queryName] = queryFunc;
});

requireMutations.keys().forEach(file => {
  const mutationName = file.replace(/\.\//, '').replace(/\.js/, '');
  const mutationFunc = requireMutations(file).default;
  exportedFunctions.Mutation[mutationName] = mutationFunc;
});

export default exportedFunctions;
