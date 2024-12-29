import { Request, Response, NextFunction } from 'express';
import { QueryRunner } from 'typeorm';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { AppDataSource } from '@config/db.config';
import { PostDbRepository } from '@feature/article/repository/db/post.db.repository';
import { Post } from '@feature/article/entity/post.entity';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import { DeletePostUseCaseResponse } from '@feature/article/usecase/response/delete-post.usecase.resposne';
import RequestContext from '@core/middleware/RequestHandler/RequestContext';

export default async function deletePostUsecase(req: Request, res: Response, next: NextFunction, queryRunner?: QueryRunner): Promise<Result<object>> {
  const connection = queryRunner?.manager || AppDataSource.manager;
  const postRepository = new PostDbRepository(connection);
  const userDetails = RequestContext.getUser();

  const { id } = req.params;

  console.log({id});

  const postDetail: Post | null = await postRepository.getById(id);

  if (!postDetail) {
    throw new BadRequestException('Post not found');
  }

  if (postDetail.deleted) {
    throw new BadRequestException('Post is already deleted');
  }

  postDetail.deleted = true;
  postDetail.lastModifiedOn = new Date();
  postDetail.lastModifiedBy = {label: userDetails.fullName, value: userDetails.id};

  await postRepository.update(postDetail);

  const response = new DeletePostUseCaseResponse(`Successfully delete ${postDetail.title} post`);

  return Result.createSuccess(response);

}
