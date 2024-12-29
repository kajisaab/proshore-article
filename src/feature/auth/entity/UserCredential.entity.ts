import { Column, Entity } from 'typeorm';
import { DbEntity } from '@common/dbEntity';

@Entity({name: 'user_credential', schema: 'article'})
export class UserCredential extends DbEntity{

  @Column({ name: 'user_id', type: 'text', nullable: true })
  public userId!: string | null;

  @Column({ name: 'max_login_attempts', type: 'integer', default: 5 })
  public maxLoginAttempts!: number;

  @Column({ name: 'login_attempts', type: 'integer', default: 0 })
  public loginAttempts!: number;

  @Column({ type: 'text', nullable: false })
  public password!: string;

  @Column({ name: 'generated_salt', type: 'text', nullable: true })
  public generatedSalt!: string | null;

  @Column({ name: 'password_history', type: 'jsonb', nullable: true })
  public passwordHistory: string[] | null = null;
}
