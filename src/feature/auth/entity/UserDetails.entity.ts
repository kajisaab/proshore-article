import { DbEntity } from '@common/dbEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user_details', schema: 'article' })
export class UserDetails extends DbEntity {

  @Column({name: 'full_name', type: 'text' })
  public fullName!: string;

  @Column({ type: 'text' })
  public email!: string;

  @Column({ type: 'boolean', default: false })
  public blocked: boolean = false;

  @Column({ type: 'boolean', default: true })
  public active: boolean = true;
}
