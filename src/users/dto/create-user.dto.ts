import { ApiProperty } from "@nestjs/swagger";
import { CreateRoleDto } from "src/roles/dto/create-role.dto";

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'Login' })
    readonly login: string;
    @ApiProperty({ example: 'a@a.ru', description: 'Email' })
    readonly email: string;
    @ApiProperty({ example: '12345', description: 'Password' })
    readonly password: string;

    @ApiProperty({ description: 'User role', type: [CreateRoleDto] })
    readonly roles?: CreateRoleDto[]
}
