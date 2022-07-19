import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import formaters from './formatters/index.js';
import buildDiffTree from './buildDiffTree.js';

const getData = (filePath) => {
  const normalizePath = path.resolve(process.cwd(), filePath);
  const dataFile = fs.readFileSync(normalizePath, 'utf-8');
  const format = path.extname(normalizePath).slice(1);
  const parseData = parser(dataFile, format);
  return parseData;
};

const getDiff = (filePath1, filePath2, format = 'stylish') => {
  const dataFile1 = getData(filePath1);
  const dataFile2 = getData(filePath2);
  const differenceTree = buildDiffTree(dataFile1, dataFile2);
  const solution = formaters(differenceTree, format);
  return solution;
};
export default getDiff;
