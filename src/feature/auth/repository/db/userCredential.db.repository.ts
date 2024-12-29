import { UserCredential } from '@feature/auth/entity/UserCredential.entity';
import { UserCredentialRepository } from '@feature/auth/repository/userCredential.repository';
import { EntityManager, Repository } from 'typeorm';

export class UserCredentialDbRepository implements UserCredentialRepository {

  private userCredentialRepository: Repository<UserCredential>;

  constructor(connection: EntityManager) {
    this.userCredentialRepository = connection.getRepository(UserCredential);
  }

  async getIndividualUserCredentials(request: Record<string, string>): Promise<UserCredential | null> {
    return await this.userCredentialRepository.findOneBy({id: request.id, deleted: false});
  }

  async save(request: UserCredential): Promise<UserCredential> {
    return await this.userCredentialRepository.save(request);
  }
}
