import { EntityManager, Repository } from 'typeorm';
import { UserDetails } from '@feature/auth/entity/UserDetails.entity';
import { UserDetailsRepository } from '@feature/auth/repository/userDetails.repository';

export class UserDetailsDbRepository implements UserDetailsRepository{
  private userRepository: Repository<UserDetails>;

  constructor(connection: EntityManager) {
    this.userRepository = connection.getRepository(UserDetails);
  }

  async getIndividualUserDetails(request: Record<string, string>): Promise<UserDetails | null> {
    return await this.userRepository.findOneBy({id: request.id, deleted: false, blocked: false, active: true});
  }

  async save(request: UserDetails): Promise<UserDetails> {
    return await this.userRepository.save(request);
  }
}
