import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";

async function hashPassword(password) {
  const hashPassword = await hash(password, 12);
  return hashPassword;
}

async function verifyPassword(password, hashPassword) {
  const isValid = compare(password, hashPassword);
  return isValid;
}

const verifyToken = (toekn, secretKey) => {
  try {
    const resault = verify(toekn, secretKey);
    return { email: resault.email };
  } catch {
    return false;
  }
};

export { hashPassword, verifyPassword, verifyToken };
