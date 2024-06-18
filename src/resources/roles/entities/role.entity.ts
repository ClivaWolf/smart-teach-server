import { UserEntity } from "src/resources/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    value: string;

    @Column()
    description: string;
   
    @ManyToMany(() => UserEntity, user => user.roles)
    users: UserEntity[];
}
