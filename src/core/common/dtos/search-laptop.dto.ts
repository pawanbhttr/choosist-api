import { ApiAcceptedResponse, ApiProperty } from "@nestjs/swagger";

export class SearchLaptopDto {
    @ApiProperty()
    price_upto: number;

    @ApiProperty()
    screen_greaterthan: number;

    @ApiProperty()
    screen_lessthan: number;

    @ApiProperty({ default: '', nullable: false, required: false })
    os: string;

    @ApiProperty()
    ram_greaterthan: number;

    @ApiProperty()
    ram_lessthan: number;

    @ApiProperty()
    ssd_greaterthan: number;

    @ApiProperty()
    ssd_lessthan: number;

    @ApiProperty()
    graphics_greaterthan: number;

    @ApiProperty()
    graphics_lessthan: number;

    @ApiProperty({ default: '', nullable: false, required: false })
    processor: string;
}