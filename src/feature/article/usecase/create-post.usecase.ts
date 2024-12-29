import { Request, Response, NextFunction } from 'express';
import { QueryRunner } from 'typeorm';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { AppDataSource } from '@config/db.config';
import { PostDbRepository } from '@feature/article/repository/db/post.db.repository';
import { Post } from '@feature/article/entity/post.entity';
import generateId from '@common/id-generator';
import { CreatePostUsecaseRequest } from '@feature/article/usecase/request/create-post.usecase.request';
import { CreatePostUseCaseResponse } from '@feature/article/usecase/response/create-post.usecase.response';
import RequestContext from '@core/middleware/RequestHandler/RequestContext';

export default async function createPostUsecase(
  req: Request,
  res: Response,
  next: NextFunction,
  queryRunner?: QueryRunner
): Promise<Result<object>> {

  const connection = queryRunner?.manager || AppDataSource.manager;
  const postRepository = new PostDbRepository(connection);

  const userDetails = RequestContext.getUser();

  console.log({userDetails});

  const body: CreatePostUsecaseRequest = req.body;

  // Handle the optional image
  const image = req.file ? req.file.buffer : null;

  const post = new Post();

  post.id = generateId('4');
  post.content = body.content;
  post.title = body.title;
  post.authorId = generateId('4');
  post.createdBy = {label: userDetails.fullName, value: userDetails.id};

  // Set featuredImage only if image exists
  if (image) {
    post.featuredImage = `data:image/jpeg;base64,${image.toString('base64')}`;
  } else {
    post.featuredImage = null; // Or leave it empty depending on your requirements
  }

  await postRepository.save(post);

  // Create response with the post data
  const response = new CreatePostUseCaseResponse('Successfully created post');

  console.log({response});

  return Result.createSuccess(response);
}
