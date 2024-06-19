import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class AboutTeacherEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => UserEntity)
    user: UserEntity

    @Column()
    school: string

    @Column()
    subject: string
}