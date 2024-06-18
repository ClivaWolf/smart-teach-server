import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    
    @ApiProperty({ example: 'USER', description: 'Role value' })
    @IsString({ message: 'value must be a string' })
    @IsNotEmpty({ message: 'value must not be empty' })
    readonly value: string;

    @ApiProperty({ example: 'Пользователь', description: 'Role description' })
    @IsString({ message: 'description must be a string' })
    @IsNotEmpty({ message: 'description must not be empty' })
    readonly description: string;
}
