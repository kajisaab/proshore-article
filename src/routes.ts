import { Router } from 'express';
import AuthRoute from '@feature/auth/routes';
import ArticleRoute from '@feature/article/routes';
const routes = Router();

routes.use('/auth', AuthRoute);

routes.use('/article', ArticleRoute);

export default routes;
