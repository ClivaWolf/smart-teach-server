import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'Login' })
    login: string;
    @ApiProperty({ example: 'a@a.ru', description: 'Email' })
    email: string;
    @ApiProperty({ example: '12345', description: 'Password' })
    password: string;
}
