import { Router } from 'express';
import { upload } from '@core/multer';
import { validate } from '@core/validation';
import { createPostSchema } from '@feature/article/validationSchema/createPostSchema';
import { asyncHandler } from '@core/middleware/ResponseHandler/asyncHandler';
import createPostUsecase from '@feature/article/usecase/create-post.usecase';
import getAllPostUsecase from '@feature/article/usecase/get-all-post.usecase';
import getIndividualPost from '@feature/article/usecase/get-individual-post.usecase';
import deletePostUsecase from '@feature/article/usecase/delete-post.usecase';
import editIndividualPostUseCase from '@feature/article/usecase/edit-individual-post.usecase';

const router = Router();

router.post('/create', upload.single('image'), validate(createPostSchema), asyncHandler(createPostUsecase));

router.get('', asyncHandler(getAllPostUsecase));

router.get('/:id', asyncHandler(getIndividualPost));

router.put('/delete/:id', asyncHandler(deletePostUsecase));

router.put('/update/:id', upload.single('image'), validate(createPostSchema), asyncHandler(editIndividualPostUseCase));

export default router;
