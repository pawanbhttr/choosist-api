import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    public name: string;
    @ApiProperty()
    public username: string;
    @ApiProperty()
    public password: string;
    @ApiProperty()
    public email: string;
    @ApiProperty()
    public contactNo: string;
}