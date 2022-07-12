import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import getDiff from '../src/DiffLogic.js';

const diff = getDiff('file1.json', 'file2.json');
const normalizePath = path.resolve('__fixtures__', 'expected.txt');
const expected = fs.readFileSync(normalizePath, 'utf-8');
test('', () => {
  expect(expected).toEqual(diff);
});
