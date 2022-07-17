import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import getDiff from '../src/index.js';

test('Checking the Structure of a Response getDiff flat object -stylish', () => {
  const normPathFlat = path.resolve('__fixtures__', 'expectedFlat.txt');
  const expectedFlat = fs.readFileSync(normPathFlat, 'utf-8');

  expect(expectedFlat).toEqual(getDiff('fileFlat1.json', 'fileFlat2.json'));
  expect(expectedFlat).toEqual(getDiff('fileFlat1.yml', 'fileFlat2.yml'));
});

test('Checking the Structure of a Response getDiff deep object -stylish', () => {
  const normPathDeep = path.resolve('__fixtures__', 'expectedDeep.txt');
  const expectedDeep = fs.readFileSync(normPathDeep, 'utf-8');

  expect(expectedDeep).toEqual(getDiff('fileDeep1.json', 'fileDeep2.json'));
  expect(expectedDeep).toEqual(getDiff('fileDeep1.yml', 'fileDeep2.yml'));
});

test('Checking the Structure of a Response getDiff deep object -plain', () => {
  const normPathDeep = path.resolve('__fixtures__', 'expectedDeep-Plain.txt');
  const expectedDeep = fs.readFileSync(normPathDeep, 'utf-8');

  expect(expectedDeep).toEqual(getDiff('fileDeep1.json', 'fileDeep2.json', 'plain'));
  expect(expectedDeep).toEqual(getDiff('fileDeep1.yml', 'fileDeep2.yml', 'plain'));
});

test('Checking the Structure of a Response getDiff deep object -json', () => {
  const normPathDeep = path.resolve('__fixtures__', 'expectedDeep-Json.txt');
  const expectedDeep = fs.readFileSync(normPathDeep, 'utf-8');
  expect(expectedDeep).toEqual(getDiff('fileDeep1.json', 'fileDeep2.json', 'json'));
  expect(expectedDeep).toEqual(getDiff('fileDeep1.yml', 'fileDeep2.yml', 'json'));
});
