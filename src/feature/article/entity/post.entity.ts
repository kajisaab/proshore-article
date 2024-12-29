import { Column, Entity } from 'typeorm';
import { DbEntity } from '@common/dbEntity';

@Entity({name : 'posts', schema: 'article'})
export class Post extends DbEntity{

  @Column({name: 'author_id', type: 'text'})
  public authorId!: string;

  @Column({name: 'title', type: 'text'})
  public title!: string;

  @Column({name: 'content', type: 'text'})
  public content!: string;

  @Column({name: 'featured_image', type: 'text'})
  public featuredImage: string | null = null;
}
