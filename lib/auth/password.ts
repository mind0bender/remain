import { hash as argon2Hash, argon2id, verify as argon2Verify } from "argon2";

export async function hashPassword(password: string): Promise<string> {
  const hash: string = await argon2Hash(password, {
    type: argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
  return hash;
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return argon2Verify(hash, password);
}
