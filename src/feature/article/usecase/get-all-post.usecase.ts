import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '@config/db.config';
import { PostDbRepository } from '@feature/article/repository/db/post.db.repository';
import { Post } from '@feature/article/entity/post.entity';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { QueryRunner } from 'typeorm';
import { GetAllPostResponseDto } from '@feature/article/dto/get-all-post.response.dto';
import { GetAllPostUseCaseResponse } from '@feature/article/usecase/response/get-all-post.usecase.response';

export default async function getAllPostUsecase(req: Request, res: Response, next: NextFunction, queryRunner?: QueryRunner): Promise<Result<object>> {
  const connection = queryRunner?.manager || AppDataSource.manager;
  const postRepository = new PostDbRepository(connection);

  const postDetails: Post[] = await postRepository.findAll();

  const responseList: GetAllPostResponseDto[] = postDetails?.map((data: Post) => ({
    id: data.id,
    authorId: data.authorId,
    title: data.title,
    content: data.content,
    image: data.featuredImage
  }));


  // Create response with the post data
  const response = new GetAllPostUseCaseResponse(responseList);

  return Result.createSuccess(response);
}
