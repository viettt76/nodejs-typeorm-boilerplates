import { Column, Entity } from 'typeorm';
import { Base } from './Base';

@Entity({ name: 'users' })
export class User extends Base {
    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;
}
