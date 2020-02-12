interface WebpackRequire extends NodeRequire {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: (path: string, recursive: boolean, pattern: RegExp) => any;
}

const { context } = (require as WebpackRequire);
const requireQueries = context('./queries', false, /\.ts$/);
const requireMutations = context('./mutations', false, /\.ts$/);

const exportedFunctions: {
  Query: {
    [key: string]: Function;
  };
  Mutation: {
    [key: string]: Function;
  };
} = {
  Query: {},
  Mutation: {}
};

requireQueries.keys().forEach((file: string): void => {
  const queryName = file.replace(/\.\//, '').replace(/\.[jt]s/, '');
  const queryFunc = requireQueries(file).default;
  exportedFunctions.Query[queryName] = queryFunc;
});

requireMutations.keys().forEach((file: string): void => {
  const mutationName = file.replace(/\.\//, '').replace(/\.[jt]s/, '');
  const mutationFunc = requireMutations(file).default;
  exportedFunctions.Mutation[mutationName] = mutationFunc;
});

export default exportedFunctions;
