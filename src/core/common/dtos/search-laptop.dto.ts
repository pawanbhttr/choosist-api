import { ApiProperty } from "@nestjs/swagger";

export class SearchLaptopDto {
    @ApiProperty()
    brand: string;

    @ApiProperty()
    os: string;

    @ApiProperty()
    processor: string;

    @ApiProperty()
    ram: number;

    @ApiProperty()
    isSSD: boolean;

    @ApiProperty()
    ssd: number;

    @ApiProperty()
    hdd: number;

    @ApiProperty()
    screen: number;

    @ApiProperty()
    graphics: number;

    @ApiProperty()
    price_greaterthan: number;

    @ApiProperty()
    price_lessthan: number;
}