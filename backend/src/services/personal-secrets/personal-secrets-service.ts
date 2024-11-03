import { LoginsService } from "./logins-service";

export type PersonalSecretsDeps = { loginsService: LoginsService };
export type PersonalSecretsService = ReturnType<typeof personalSecretsServiceFactory>;

export type TPersonalSecretsServiceFactory = ReturnType<typeof personalSecretsServiceFactory>;

export const personalSecretsServiceFactory = ({ loginsService }: PersonalSecretsDeps) => {
  return { logins: loginsService };
};
