import { ApiProperty } from "@nestjs/swagger";

export class ContactDto {
    @ApiProperty({ readOnly: true })
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    address: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneno: string;

    @ApiProperty()
    message: string;
}