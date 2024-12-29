import { LabelValuePairDto } from '@common/dto/LabelValuePairDto';

export interface GetIndividualPostResponseDto{
  id: string;
  authorId: string;
  title: string;
  content: string;
  image: string | null;
  createdBy: LabelValuePairDto | null;
}
