import { UserCredential } from '@feature/auth/entity/UserCredential.entity';

export interface UserCredentialRepository {
  getIndividualUserCredentials(request: Record<string, string>): Promise<UserCredential | null>;
  save(request: UserCredential): Promise<UserCredential>;
}
