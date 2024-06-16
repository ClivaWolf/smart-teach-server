import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Role value' })
    value: string;
    @ApiProperty({ example: 'Администратор', description: 'Role description' })
    description: string;
}
