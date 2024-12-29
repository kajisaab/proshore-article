import { LoginResponseDto } from '@feature/auth/dto/LoginResponseDto';

export class LoginResponse {
  constructor(public readonly data: LoginResponseDto) {}
}
