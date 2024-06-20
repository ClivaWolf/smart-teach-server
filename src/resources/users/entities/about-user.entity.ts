import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

enum visibility {
    everyone = 'everyone',
    teachers = 'teachers',
    hidden = 'hidden'
}

@Entity()
export class AboutUserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => UserEntity)
    user: UserEntity

    @Column({nullable:true})
    name: string

    @Column({nullable:true})
    surname: string

    @Column({nullable:true})
    patronymic: string

    @Column({nullable:true})
    birthday: Date

    @Column({nullable:true})
    city: string

    @Column({nullable:true})
    avatar: string

    @Column({default: visibility.teachers, nullable:true})
    emailVisible: visibility

    @Column({nullable:true})
    signature: string
}