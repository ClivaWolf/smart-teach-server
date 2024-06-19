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

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    patronymic: string

    @Column({nullable:true})
    city: string


    @Column({default: visibility.teachers})
    emailVisible: visibility

    @Column({nullable:true})
    signature: string
}