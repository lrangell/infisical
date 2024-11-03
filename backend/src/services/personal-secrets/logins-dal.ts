import { TDbClient } from "@app/db";
import { TableName } from "@app/db/schemas";
import {
  TPersonalPasswords,
  TPersonalPasswordsInsert,
  TPersonalPasswordsUpdate
} from "@app/db/schemas/personal-passwords";
import { ormify } from "@app/lib/knex";

export type LoginsDal = ReturnType<typeof loginsDALFactory>;

export const loginsDALFactory = (db: TDbClient) => {
  const loginOrm = ormify(db, TableName.PersonalPasswords);
  const create = async (data: TPersonalPasswordsInsert) => {
    await db(TableName.PersonalPasswords).insert(data);
  };

  const list = async (userId: string): Promise<Array<TPersonalPasswords>> => {
    const passwords = await db(TableName.PersonalPasswords).where({ userId });
    return passwords;
  };

  const deleteLogin = async (id: string): Promise<void> => {
    await db(TableName.PersonalPasswords).where({ id }).del();
  };
  const edit = async (data: TPersonalPasswordsUpdate) => {
    await db(TableName.PersonalPasswords).update(data);
  };

  return { ...loginOrm, create, list, deleteLogin, edit };
};
