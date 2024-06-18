import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";
import { CreateRoleDto } from "src/roles/dto/create-role.dto";

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'Login' })
    @IsString({ message: 'login must be a string' })
    @IsNotEmpty({ message: 'login must not be empty' })
    readonly login: string;
    @ApiProperty({ example: 'a@a.ru', description: 'Email' })
    @IsString({ message: 'email must be a string' })
    @IsNotEmpty({ message: 'email must not be empty' })
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'email is not valid' })
    readonly email: string;
    @ApiProperty({ example: '12345', description: 'Password' })
    @IsString({ message: 'password must be a string' })
    @IsNotEmpty({ message: 'password must not be empty' })
    //TODO: slice password validation to count and symbols

    //pass too short:
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/, { message: 'password too short' })
    readonly password: string;

    //@ApiProperty({ description: 'User role', type: [CreateRoleDto] })
    readonly roles?: CreateRoleDto[]
}
