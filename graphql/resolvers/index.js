import fs from 'fs';
import path from 'path';

const queryFiles = fs.readdirSync(path.resolve(__dirname, 'queries'));
const mutationFiles = fs.readdirSync(path.resolve(__dirname, 'mutations'));

const exportedFunctions = {
  Query: {},
  Mutation: {},
};
queryFiles.forEach((file) => {
  if (!/\.js/.test(file)) {
    return;
  }
  file = file.replace(/\..*/, '');
  exportedFunctions.Query[file] = require(
      path.resolve(__dirname, 'queries', file)
  );
  console.log('Loaded query: ' + file);
});

mutationFiles.forEach((file) => {
  if (!/\.js/.test(file)) {
    return;
  }
  file = file.replace(/\..*/, '');
  exportedFunctions.Mutation[file] = require(
      path.resolve(__dirname, 'mutations', file)
  );
  console.log('Loaded mutation: ' + file);
});

export default exportedFunctions;
