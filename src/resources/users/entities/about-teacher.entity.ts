import { ChildEntity, Column } from "typeorm";
import { AboutUserEntity } from "./about-user.entity";

@ChildEntity()
export class AboutTeacherEntity extends AboutUserEntity {
    @Column()
    school: string

    @Column()
    subject: string
}