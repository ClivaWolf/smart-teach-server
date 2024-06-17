import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({ example: 'USER', description: 'Role value' })
    readonly value: string;
    @ApiProperty({ example: 'Пользователь', description: 'Role description' })
    readonly description: string;
}
