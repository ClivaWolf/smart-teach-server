import { UserEntity } from "src/resources/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    filename: string

    @Column()
    originalName: string

    @Column()
    size: number

    @Column()
    mimetype: string

    @Column({ nullable: true })
    path: string

    @ManyToOne(() => UserEntity, (user) => user.files)
    user: UserEntity;

    @DeleteDateColumn()
    deletedAt?: Date
}
