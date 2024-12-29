import { GetAllPostResponseDto } from '@feature/article/dto/get-all-post.response.dto';

export class GetAllPostUseCaseResponse {
  constructor(public readonly list: GetAllPostResponseDto[]) {
  }
}
