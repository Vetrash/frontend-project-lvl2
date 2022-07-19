import _ from 'lodash';
import isObject from './utils/isObject.js';

const buildDiffTree = (data1, data2) => {
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
      return { key, status: 'parent', child: buildDiffTree(arr1[key], arr2[key]) };
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
  const differenceTree = sortKeys.map((key) => getDifference(data1, data2, key));
  return differenceTree;
};
export default buildDiffTree;
