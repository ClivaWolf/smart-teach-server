import { RoleEntity } from "src/roles/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    login: string;

    @Column()
    email: string;

    @Column()
    password: string;

    //only id
    @ManyToMany(() => RoleEntity, role => role.users, { cascade: true })
    @JoinTable()
    roles: RoleEntity[];
}
