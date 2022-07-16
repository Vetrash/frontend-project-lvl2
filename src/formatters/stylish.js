import isObject from '../isObject.js';

const tabulator = (deep) => '    '.repeat(deep);

const stringify = (value, deep) => {
  if (!isObject(value)) return value;
  const entries = Object.entries(value);
  const stringifyObj = entries.map(([key, val]) => `  ${tabulator(deep)}  ${key}: ${stringify(val, deep + 1)}`).join('\n');
  return `{\n${stringifyObj}\n  ${tabulator(deep - 1)}  }`;
};

const treeСonstructor = (elem, deep) => {
  switch (elem.status) {
    case 'added':
      return `  ${tabulator(deep)}+ ${elem.key}: ${stringify(elem.valueNow, deep + 1)}`;
    case 'removed':
      return `  ${tabulator(deep)}- ${elem.key}: ${stringify(elem.valueOld, deep + 1)}`;
    case 'unchanged':
      return `  ${tabulator(deep)}  ${elem.key}: ${stringify(elem.valueOld, deep + 1)}`;
    case 'updated':
      return `  ${tabulator(deep)}- ${elem.key}: ${stringify(elem.valueOld, deep + 1)}\n  ${tabulator(deep)}+ ${elem.key}: ${stringify(elem.valueNow, deep + 1)}`;
    case 'parent':
      return `  ${tabulator(deep)}  ${elem.key}: {\n${elem.child.map((element) => treeСonstructor(element, deep + 1)).join('\n')}\n  ${tabulator(deep)}  }`;
    default:
      throw new Error('invalid status');
  }
};

const getStylish = (difference) => {
  const tree = difference.map((elem) => treeСonstructor(elem, 0)).join('\n');
  return `{\n${tree}\n}`;
};

export default getStylish;
