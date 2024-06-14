import { Column, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";

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

    @DeleteDateColumn()
    deletedAt?: Date
}
