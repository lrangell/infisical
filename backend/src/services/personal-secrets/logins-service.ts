import { SecretKeyEncoding } from "@app/db/schemas";
import { infisicalSymmetricDecrypt, infisicalSymmetricEncypt } from "@app/lib/crypto/encryption";

import { LoginsDal } from "./logins-dal";

export type LoginsDeps = { loginsDal: LoginsDal };
export type LoginsService = ReturnType<typeof loginsServiceFactory>;

type CreateLoginParams = { login: string; plainTextPassword: string; userId: string };

export const loginsServiceFactory = ({ loginsDal }: LoginsDeps) => {
  const create = async ({ login, plainTextPassword, userId }: CreateLoginParams) => {
    const { ciphertext, iv, tag, encoding } = infisicalSymmetricEncypt(plainTextPassword);
    await loginsDal.create({
      login,
      encryptedPassword: Buffer.from(ciphertext, "utf8"),
      iv: Buffer.from(iv, encoding),
      tag: Buffer.from(tag, encoding),
      userId
    });
  };

  const list = async ({ userId }: { userId: string }) => {
    const passwords = await loginsDal.list(userId);
    const decryptedPasswords = passwords.map(({ encryptedPassword, iv, tag, login, encoding, id }) => {
      const password = infisicalSymmetricDecrypt({
        keyEncoding: encoding as SecretKeyEncoding,
        ciphertext: encryptedPassword.toString(encoding as BufferEncoding),
        iv: iv.toString(encoding as BufferEncoding),
        tag: tag.toString(encoding as BufferEncoding)
      });
      return { login, password, id };
    });
    return decryptedPasswords;
  };

  const deleteLogin = async ({ id }: { id: string }) => {
    await loginsDal.deleteLogin(id);
  };

  const edit = async ({ login, plainTextPassword, id }: { id: string } & CreateLoginParams) => {
    const { ciphertext, iv, tag, encoding } = infisicalSymmetricEncypt(plainTextPassword);
    await loginsDal.create({
      login,
      encryptedPassword: Buffer.from(ciphertext, "utf8"),
      iv: Buffer.from(iv, encoding),
      tag: Buffer.from(tag, encoding),
      id
    });
  };

  return { create, list, deleteLogin, edit };
};
