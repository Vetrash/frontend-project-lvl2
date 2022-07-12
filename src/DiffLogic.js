import fs from 'fs';
import path from 'path';

const getData = (filePath) => {
  const normalizePath = path.resolve('__fixtures__', filePath);
  const dataFile = fs.readFileSync(normalizePath, 'utf-8');
  const parseData = JSON.parse(dataFile);
  return parseData;
};

const getDiff = (filePath1, filePath2) => {
  const dataFile1 = getData(filePath1);
  const dataFile2 = getData(filePath2);
  const entriesFile1 = Object.entries(dataFile1);
  const entriesFile2 = Object.entries(dataFile2);
  const diff = [];

  const sortDiff = (a, b) => {
    if (a[2] < b[2]) { return -1; }
    if (a[2] > b[2]) { return 1; }
    return 0;
  };

  entriesFile1.forEach((key) => {
    const namePos = `+ ${key[0]}`;
    const nameNeg = `- ${key[0]}`;
    if (key[0] in dataFile2) {
      if (dataFile1[key[0]] === dataFile2[key[0]]) {
        diff.push(`  ${key[0]}: ${dataFile1[key[0]]}`);
      } else {
        diff.push(`${nameNeg}: ${dataFile1[key[0]]}`);
        diff.push(`${namePos}: ${dataFile2[key[0]]}`);
      }
    } else {
      diff.push(`${nameNeg}: ${dataFile1[key[0]]}`);
    }
  });

  entriesFile2.forEach((key) => {
    const namePos = `+ ${key[0]}`;
    if (!(key[0] in dataFile1)) {
      diff.push(`${namePos}: ${dataFile2[key[0]]}`);
    }
  });
  diff.sort(sortDiff);
  return `{\n${diff.join('\n')}\n}`;
};
export default getDiff;
