import { ApiProperty } from "@nestjs/swagger";

export class LaptopDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    brand: string;

    @ApiProperty()
    os: string;

    @ApiProperty()
    processor: string;

    @ApiProperty()
    ram: number;

    @ApiProperty()
    ssd: number;

    @ApiProperty()
    hdd: number;

    @ApiProperty()
    screen: number;

    @ApiProperty()
    graphics: number;

    @ApiProperty()
    battery: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    purchaseUrl: string;

    @ApiProperty()
    imageUrl: string;
}