// Code generated by automation script, DO NOT EDIT.
// Automated by pulling database and generating zod schema
// To update. Just run npm run generate:schema
// Written by akhilmhdh.

import { z } from "zod";

import { zodBuffer } from "@app/lib/zod";

import { TImmutableDBKeys } from "./models";

export const PersonalPasswordsSchema = z.object({
  id: z.string().uuid(),
  login: z.string(),
  algorithm: z.string().default("aes-256-gcm"),
  encoding: z.string().default("base64"),
  encryptedPassword: zodBuffer,
  iv: zodBuffer,
  tag: zodBuffer,
  userId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type TPersonalPasswords = z.infer<typeof PersonalPasswordsSchema>;
export type TPersonalPasswordsInsert = Omit<z.input<typeof PersonalPasswordsSchema>, TImmutableDBKeys>;
export type TPersonalPasswordsUpdate = Partial<Omit<z.input<typeof PersonalPasswordsSchema>, TImmutableDBKeys>>;
