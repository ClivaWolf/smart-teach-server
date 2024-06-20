import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsDate, IsOptional, IsString } from "class-validator"

enum visibility {
    everyone = 'everyone',
    teachers = 'teachers',
    hidden = 'hidden'
}


export class CreateProfileDto {
    @ApiProperty({ example: 'John', description: 'Name' })
    @IsString({ message: 'name must be a string' })
    name?: string

    @ApiProperty({ example: 'Smith', description: 'Surname' })
    @IsString({ message: 'surname must be a string' })
    surname?: string

    @ApiProperty({ example: 'Doe', description: 'Patronymic' })
    @IsString({ message: 'patronymic must be a string' })
    @IsOptional()
    patronymic?: string

    @ApiProperty({ example: '1990-01-01', description: 'Birthday' })
    @IsDate({ message: 'birthday must be a date' })
    @IsOptional()
    birthday?: Date

    @ApiProperty({ example: 'Moscow', description: 'City' })
    @IsString({ message: 'city must be a string' })
    @IsOptional()
    city?: string

    @ApiProperty({ example: 'kt12o99mg2.gif', description: 'Avatar, add http://localhost:4444/uploads' })
    @IsString({ message: 'avatar must be a string' })
    @IsOptional()
    avatar?: string

    @ApiProperty({ example: 'everyone', description: 'Visibility of email' })
    @IsString({ message: 'emailVisible must be a string' })
    @IsOptional()
    emailVisible?: visibility

    @ApiProperty({ example: '--John Smith--', description: 'Signature' })
    @IsString({ message: 'signature must be a string' })
    @IsOptional()
    signature?: string
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}