const checkFieldValidity = (field, regExp) => {
  if (field.match(regExp)) {
    return true;
  }

  return false;
};

export default checkFieldValidity;
