const isObject = (obj) => {
  if (typeof obj === 'object' && obj !== null) {
    return true;
  }
  return false;
};
export default isObject;
