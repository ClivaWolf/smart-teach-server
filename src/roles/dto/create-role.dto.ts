import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Role value' })
    value: string;
    @ApiProperty({ example: 'Administrator role', description: 'Role description' })
    description: string;
}
