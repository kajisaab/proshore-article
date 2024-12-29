import { Request, Response, NextFunction } from 'express';
import { QueryRunner } from 'typeorm';
import { AppDataSource } from '@config/db.config';
import { PostDbRepository } from '@feature/article/repository/db/post.db.repository';
import { Post } from '@feature/article/entity/post.entity';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import { GetIndividualPostResponseDto } from '@feature/article/dto/get-individual-post.response.dto';
import { Result } from '@core/middleware/ResponseHandler/Result';

export default async function getIndividualPost(
  req: Request,
  res: Response,
  next: NextFunction,
  queryRunner?: QueryRunner
) {
  const connection = queryRunner?.manager || AppDataSource.manager;
  const postRepository = new PostDbRepository(connection);

  const {id} = req.params;

  const postDetail : Post | null = await postRepository.getById(id);

  if(!postDetail) {
    throw new BadRequestException('Post not found');
  }

  const response : GetIndividualPostResponseDto = {
    id: postDetail.id,
    authorId: postDetail.authorId,
    title: postDetail.title,
    content: postDetail.content,
    image: postDetail.featuredImage,
    createdBy: postDetail.createdBy
  };

  return Result.createSuccess(response);

}
