import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import getDiff from '../src/index.js';

const getExpected = (nameFile) => {
  const normPathFlat = path.resolve('__fixtures__', nameFile);
  return fs.readFileSync(normPathFlat, 'utf-8');
};

test.each([
  ['json', 'stylish', 'expectedDeep.txt'],
  ['json', 'plain', 'expectedDeep-Plain.txt'],
  ['json', 'json', 'expectedDeep-Json.txt'],
  ['yml', 'stylish', 'expectedDeep.txt'],
  ['yml', 'plain', 'expectedDeep-Plain.txt'],
  ['yml', 'json', 'expectedDeep-Json.txt'],
])('.add(format file: %s, formatters: %s)', (formatFile, formatters, expFileName) => {
  const expected = getExpected(expFileName);
  expect(expected).toEqual(getDiff(`__fixtures__/fileDeep1.${formatFile}`, `__fixtures__/fileDeep2.${formatFile}`, formatters));
});
