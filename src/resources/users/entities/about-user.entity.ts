import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum visibility {
    everyone = 'everyone',
    teachers = 'teachers',
    hidden = 'hidden'
}

@Entity('')
export class AboutUserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

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