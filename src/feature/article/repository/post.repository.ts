import { Post } from '@feature/article/entity/post.entity';

export interface PostRepository {

  save(post: Post): Promise<Post>;

  getById(id: string): Promise<Post | null>;

  findAll(): Promise<Post[]>;

  update(request:Post): Promise<Post>;
}
