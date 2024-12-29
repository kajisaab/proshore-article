import { Column, BeforeInsert, Entity, PrimaryColumn } from 'typeorm';
import { LabelValuePairDto } from '@common/dto/LabelValuePairDto';

@Entity()
export class DbEntity {
  @PrimaryColumn({type: 'text', nullable: false })
  public id!: string;

  @Column({name: 'created_by', type: "jsonb", nullable: true})
  public createdBy: LabelValuePairDto | null = null;

  @Column({ name: 'created_on', type: 'timestamp' })
  public createdOn!: Date;

  @Column({name: 'last_modified_by', type: "jsonb", nullable: true})
  public lastModifiedBy: LabelValuePairDto | null = null;

  @Column({ name: 'last_modified_on', type: 'timestamp', nullable: true })
  public lastModifiedOn: Date | null = null;

  @Column({name : 'deleted', nullable: false, type: 'boolean', default: false})
  public deleted: boolean = false;

  @BeforeInsert()
  setCreatedAt() {
    this.createdOn = new Date();
  }
}
