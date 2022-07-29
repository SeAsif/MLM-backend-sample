const { compare, hash } = require('bcryptjs');
const crypto = require('crypto');

const hashPassword = async password => {
  return await hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};

const genRandomHash = () => {
  return crypto.randomBytes(20).toString('hex');
};

const genForgotPasswordToken = () => {
  return genRandomHash();
};

const genSlug = title => title.split(' ').join('-').toLowerCase();

module.exports = {
  hashPassword,
  comparePassword,
  genForgotPasswordToken,
  genSlug,
};
