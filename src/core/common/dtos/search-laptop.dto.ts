import { ApiAcceptedResponse, ApiProperty } from "@nestjs/swagger";

export class SearchLaptopDto {
    @ApiProperty({ default: true })
    isPersonalUse: boolean;

    @ApiProperty()
    price_upto: number;

    @ApiProperty()
    screen_greaterthan: number;

    @ApiProperty()
    screen_lessthan: number;

    @ApiProperty()
    os: string;
}