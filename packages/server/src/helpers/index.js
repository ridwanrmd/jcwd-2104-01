const isFieldEmpties = (fields) => {
  const filteredKeys = Object.keys(fields).filter(
    (key) => fields[key] == '' || fields[key] == undefined,
  );
  return filteredKeys;
};

const passwordValidator = (value) => {
  const anyUpperCase = /^(?=.*[A-Z]).*$/;
  if (!anyUpperCase.test(value)) {
    return 'Password must have at least one uppercase character.';
  }

  const anyLowerCase = /^(?=.*[a-z]).*$/;
  if (!anyLowerCase.test(value)) {
    return 'Password must have at least one lowercase character.';
  }

  const anyNumber = /^(?=.*[0-9]).*$/;
  if (!anyNumber.test(value)) {
    return 'Password must contain at least one number.';
  }

  const lengthRequirment = /^.{8,16}$/;
  if (!lengthRequirment.test(value)) {
    return 'Password must be 8-16 characters long.';
  }

  return null;
};

module.exports = { isFieldEmpties, passwordValidator };
