import YAML from 'js-yaml';

const parsersData = {
  json: JSON.parse,
  yaml: YAML.load,
  yml: YAML.load,
};
const parser = (data, format) => {
  switch (format) {
    case 'json':
    case 'yaml':
    case 'yml':
      return parsersData[format](data);
    default:
      throw new Error(`Unknown format ${format}`);
  }
};
export default parser;
