import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";
import { CreateRoleDto } from "src/resources/roles/dto/create-role.dto";

const randomLogin = () =>{
    let login = 'User-'
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
    for (let i = 0; i < 10; i++) {
        login += chars[Math.floor(Math.random() * chars.length)]
    }
    return login
}

const randomEmail = () =>{
    let email = ''
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
    for (let i = 0; i < 10; i++) {
        email += chars[Math.floor(Math.random() * chars.length)]
    }
    return email+'@tmail.com'
}

const randomPassword = () =>{
    let password = ''
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
    for (let i = 0; i < 8; i++) {
        password += chars[Math.floor(Math.random() * chars.length)]
    }
    return password
}

export class CreateUserDto {
    
    @ApiProperty({ example: randomLogin(), description: 'Login' })
    @IsString({ message: 'login must be a string' })
    @IsNotEmpty({ message: 'login must not be empty' })
    readonly login: string;

    @ApiProperty({ example: randomEmail(), description: 'Email' })
    @IsString({ message: 'email must be a string' })
    @IsNotEmpty({ message: 'email must not be empty' })
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'email is not valid' })
    readonly email: string;

    @ApiProperty({ example: randomPassword(), description: 'Password' })
    @IsString({ message: 'password must be a string' })
    @IsNotEmpty({ message: 'password must not be empty' })
    readonly password: string;

    //@ApiProperty({ description: 'User role', type: [CreateRoleDto] })
    readonly roles?: CreateRoleDto[]
}
