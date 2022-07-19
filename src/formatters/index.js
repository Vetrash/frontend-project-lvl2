import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const typeFormat = {
  stylish: (diff) => stylish(diff),
  plain: (diff) => plain(diff),
  json: (diff) => json(diff),
};
const formaters = (difference, format) => {
  switch (format) {
    case 'stylish':
    case 'plain':
    case 'json':
      return typeFormat[format](difference);
    default:
      throw new Error(`Unknown format ${format}`);
  }
};
export default formaters;
