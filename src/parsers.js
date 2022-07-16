import YAML from 'js-yaml';

const parsersData = {
  json: JSON.parse,
  yaml: YAML.load,
  yml: YAML.load,
};
const parser = (data, format) => parsersData[format](data);

export default parser;
