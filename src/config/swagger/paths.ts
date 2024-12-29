/**
 * import the paths to be used here
 */
import auth from '@feature/auth/docs'; // import the auth paths
import article from '@feature/article/docs'; // import the article paths
export default {
  paths: {
    ...auth.paths,
    ...article.paths,

  }
};
