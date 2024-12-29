// src/core/requestContext/RequestContext.ts

import { UserDetails } from '@feature/auth/entity/UserDetails.entity';

class RequestContext {
  private static context: { user: UserDetails } = {
    user: new UserDetails
  };

  // Set user details
  static setUser(user: UserDetails): void {
    this.context.user = user;
  }

  // Get user details
  static getUser(): UserDetails {
    return this.context.user;
  }
}

export default RequestContext;
