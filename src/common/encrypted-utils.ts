import * as bcrypt from 'bcrypt';

const SALT = 10;

export async function encryptedPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT);
}

export async function comparePassword(
  encryptedPassword: string,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, encryptedPassword);
}
