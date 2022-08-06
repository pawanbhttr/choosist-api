import { ApiProperty } from "@nestjs/swagger";
import { LaptopUsage } from "../enums/laptop-usage.enum";

export class SearchLaptopDto {
    @ApiProperty({ default: LaptopUsage.Personal })
    usage: LaptopUsage;

    @ApiProperty()
    price_upto: number;
}