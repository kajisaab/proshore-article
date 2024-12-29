import { PostRepository } from '@feature/article/repository/post.repository';
import { EntityManager, Repository } from 'typeorm';
import { Post } from '@feature/article/entity/post.entity';

export class PostDbRepository implements PostRepository {

  private postRepository: Repository<Post>;

  constructor(connection: EntityManager) {
    this.postRepository = connection.getRepository(Post);
  }

  async update(request: Post): Promise<Post> {
    return await this.postRepository.save(request);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findBy({ deleted: false });
  }

  async getById(id: string): Promise<Post | null> {
    console.log('id', id);
    return await this.postRepository.findOneBy({ id: id, deleted: false });
  }

  async save(post: Post): Promise<Post> {
    return await this.postRepository.save(post);
  }
}
