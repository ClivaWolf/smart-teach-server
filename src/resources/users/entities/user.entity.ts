import { RoleEntity } from "src/resources/roles/entities/role.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AboutTeacherEntity } from "./about-teacher.entity";
import { AboutUserEntity } from "./about-user.entity";
import { FileEntity } from "src/resources/files/entities/file.entity";

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

    @OneToMany(() => FileEntity, (file) => file.user)
    files: FileEntity[];

    @ManyToMany(() => RoleEntity, role => role.users, { cascade: true })
    @JoinTable()
    roles: RoleEntity[];

    @OneToOne(() => AboutUserEntity, aboutUser => aboutUser.user, { nullable: true, cascade: true })
    @JoinColumn()
    aboutUser?: AboutUserEntity

    @OneToOne(() => AboutTeacherEntity, aboutTeacher => aboutTeacher.user, { nullable: true })
    @JoinColumn()
    aboutTeacher?: AboutTeacherEntity;
}
