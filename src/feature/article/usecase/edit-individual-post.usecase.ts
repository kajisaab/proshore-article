import { Request, Response, NextFunction } from 'express';
import { QueryRunner } from 'typeorm';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { AppDataSource } from '@config/db.config';
import { PostDbRepository } from '@feature/article/repository/db/post.db.repository';
import { CreatePostUsecaseRequest } from '@feature/article/usecase/request/create-post.usecase.request';
import { Post } from '@feature/article/entity/post.entity';
import { CreatePostUseCaseResponse } from '@feature/article/usecase/response/create-post.usecase.response';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import RequestContext from '@core/middleware/RequestHandler/RequestContext';

export default async function editIndividualPostUseCase(req: Request, res: Response, next: NextFunction, queryRunner?:QueryRunner):Promise<Result<object>>{

  const connection = queryRunner?.manager || AppDataSource.manager;
  const postRepository = new PostDbRepository(connection);
  const userDetails = RequestContext.getUser();

  const body: CreatePostUsecaseRequest = req.body;

  const {id} = req.params;

  const post : Post | null = await postRepository.getById(id);

  if(!post){
    throw new BadRequestException('Cannot find the post to update');
  }

  // Handle the optional image
  const image = req.file ? req.file.buffer : null;

  post.content = body.content;
  post.title = body.title;
  post.lastModifiedOn = new Date();
  post.lastModifiedBy = {label: userDetails.fullName, value: userDetails.id};

  // Set featuredImage only if image exists
  if (image) {
    post.featuredImage = `data:image/jpeg;base64,${image.toString('base64')}`;
  }

  await postRepository.save(post);

  // Create response with the put data
  const response = new CreatePostUseCaseResponse('Successfully updated post');

  return Result.createSuccess(response);
}
