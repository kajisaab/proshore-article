import { UserDetails } from '@feature/auth/entity/UserDetails.entity';

export interface UserDetailsRepository{
  getIndividualUserDetails(request: Record<string, string>): Promise<UserDetails | null>
  save(request: UserDetails): Promise<UserDetails> ;
}
