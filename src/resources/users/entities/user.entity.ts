import { RoleEntity } from "src/resources/roles/entities/role.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AboutTeacherEntity } from "./about-teacher.entity";
import { AboutUserEntity } from "./about-user.entity";

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

    @OneToOne(() => AboutTeacherEntity, aboutTeacher => aboutTeacher.user, {nullable: true})
    @JoinColumn()
    aboutTeacher?: AboutTeacherEntity;

    @OneToOne(() => AboutUserEntity, aboutUser => aboutUser.user, {nullable: true})
    @JoinColumn()
    aboutUser?: AboutUserEntity
}
