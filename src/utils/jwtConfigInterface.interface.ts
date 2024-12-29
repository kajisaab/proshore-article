export interface JwtTokenUserDetail {
  aud?: string;
  userId: string;
  fullName: string;
  refreshToken: string;
}
