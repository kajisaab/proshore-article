import { GetIndividualPostResponseDto } from '@feature/article/dto/get-individual-post.response.dto';

export class GetIndividualPostUseCaseResponse {
  constructor(public readonly data: GetIndividualPostResponseDto) {
  }
}
