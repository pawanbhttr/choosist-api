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
    ram: number;

    @ApiProperty()
    ssd: number;

    @ApiProperty()
    graphics: number;

    @ApiProperty({ default: '', nullable: false, required: false })
    processor: string;
}