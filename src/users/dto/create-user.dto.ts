import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'Login' })
    readonly login: string;
    @ApiProperty({ example: 'a@a.ru', description: 'Email' })
    readonly email: string;
    @ApiProperty({ example: '12345', description: 'Password' })
    readonly password: string;
}
