const isEmpty = (value: Array<any> | { [key: string]: any }): Boolean => {
  if (Array.isArray(value)) {
    return !value.length;
  }
  return !Object.entries(value).length;
};

export default isEmpty;
