import { UserRole } from 'src/enum/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
