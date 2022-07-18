import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers.js';
import formaters from './formatters/index.js';
import isObject from './isObject.js';

const getData = (filePath) => {
  const normalizePath = filePath.includes('/') ? path.resolve(process.cwd(), filePath) : path.resolve(process.cwd(), '__fixtures__', filePath);
  const dataFile = fs.readFileSync(normalizePath, 'utf-8');
  const type = path.extname(normalizePath).slice(1);
  const parseData = parser(dataFile, type);
  return parseData;
};

const diffСonstructor = (data1, data2) => {
  const getDifference = (arr1, arr2, key) => {
    if (!(key in arr1)) {
      return {
        key, status: 'added', valueOld: null, valueNow: arr2[key],
      };
    }
    if (!(key in arr2)) {
      return {
        key, status: 'removed', valueOld: arr1[key], valueNow: null,
      };
    }
    if (isObject(arr1[key]) && isObject(arr2[key])) {
      return { key, status: 'parent', child: diffСonstructor(arr1[key], arr2[key]) };
    }
    if (arr1[key] !== arr2[key]) {
      return {
        key, status: 'updated', valueOld: arr1[key], valueNow: arr2[key],
      };
    }
    return { key, status: 'unchanged', valueOld: arr1[key] };
  };
  const fusionKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortKeys = _.sortBy(fusionKeys);
  const differences = sortKeys.map((key) => getDifference(data1, data2, key));
  return differences;
};

const getDiff = (filePath1, filePath2, format = 'stylish') => {
  const dataFile1 = getData(filePath1);
  const dataFile2 = getData(filePath2);
  const differences = diffСonstructor(dataFile1, dataFile2);
  const solution = formaters(differences, format);
  return solution;
};
export default getDiff;
