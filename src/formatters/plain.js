import isObject from '../utils/isObject.js';

const stringify = (value) => {
  if (isObject(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

const treeСonstructor = (elem, parent = '') => {
  switch (elem.status) {
    case 'added':
      return `Property '${parent}${elem.key}' was ${elem.status} with value: ${stringify(elem.valueNow)}`;
    case 'removed':
      return `Property '${parent}${elem.key}' was ${elem.status}`;
    case 'updated':
      return `Property '${parent}${elem.key}' was ${elem.status}. From ${stringify(elem.valueOld)} to ${stringify(elem.valueNow)}`;
    case 'parent':
      return elem.child.map((element) => treeСonstructor(element, `${parent + elem.key}.`)).filter((el) => el !== null).join('\n');
    case 'unchanged':
      return null;
    default:
      throw new Error(`plain does not have an instruction for working with the status ${elem.status}`);
  }
};

const getPlain = (difference) => {
  const tree = difference.map((elem) => treeСonstructor(elem)).join('\n');
  return tree;
};

export default getPlain;
