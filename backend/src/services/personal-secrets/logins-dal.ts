import { TDbClient } from "@app/db";
import { TableName, TPersonalPasswords, TPersonalPasswordsInsert } from "@app/db/schemas";
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

  return { ...loginOrm, create, list };
};
