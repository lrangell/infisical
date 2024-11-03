import { Knex } from "knex";

import { TableName } from "../schemas";
import { SecretEncryptionAlgo, SecretKeyEncoding } from "../schemas/models";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable(TableName.PersonalPasswords))) {
    await knex.schema.createTable(TableName.PersonalPasswords, (t) => {
      t.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
      t.string("login", 100).notNullable();
      t.string("algorithm", 100).notNullable().defaultTo(SecretEncryptionAlgo.AES_256_GCM);
      t.string("encoding", 100).notNullable().defaultTo(SecretKeyEncoding.UTF8);
      t.binary("encryptedPassword").notNullable();
      t.binary("iv").notNullable();
      t.binary("tag").notNullable();
      t.uuid("userId").notNullable();
      t.foreign("userId").references("id").inTable(TableName.Users).onDelete("CASCADE");
      t.timestamps(true, true, true);
      t.index(["userId"]);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TableName.PersonalPasswords);
}
