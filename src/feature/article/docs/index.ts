import schemas from '@feature/article/docs/schemas';
import createPost from '@feature/article/docs/createPost';
import getAllPost from '@feature/article/docs/getAllPost';
import getIndividualPost from '@feature/article/docs/getIndividualPost';
import deletePost from '@feature/article/docs/deletePost';


export default {
  schemas,
  paths: {
    '/article/create': { ...createPost },
    '/article': {...getAllPost},
    '/article/{id}': {...getIndividualPost},
    '/article/delete/{id}': {...deletePost}
  }
};
