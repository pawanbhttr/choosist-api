import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LaptopDto } from "src/core/common/dtos/laptop.dto";
import { SearchLaptopDto } from "src/core/common/dtos/search-laptop.dto";
import { Laptop } from "src/core/entities/laptop.entity";
import { LaptopService } from "src/core/services/laptop.service";
import { JwtAuthGuard } from "src/infrastructure/common/guards/auth.guard";

@ApiBearerAuth()
@ApiTags("Laptop")
@Controller("api/laptop")
export class LaptopController {
    constructor(private laptopService: LaptopService) { }

    @Get()
    // @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async findAll(): Promise<Laptop[]> {
        return await this.laptopService.findAll();
    }

    @Get(":id")
    // @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async find(@Param('id') id: string): Promise<Laptop> {
        return await this.laptopService.findById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async create(@Body() model: LaptopDto): Promise<Laptop> {
        return await this.laptopService.create(model);
    }

    @Put(":id")
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async update(@Param('id') id: string, @Body() model: LaptopDto): Promise<void> {
        return await this.laptopService.update(id, model);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async delete(@Param('id') id: string): Promise<void> {
        await this.laptopService.delete(id);
    }

    @Post("search")
    // @UseGuards(JwtAuthGuard)
    @ApiResponse({ type: [Laptop], isArray: true, status: 200 })
    async search(@Body() model: SearchLaptopDto): Promise<Laptop[]> {
        return await this.laptopService.search(model);
    }

    @Get("brand/:brand")
    // @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async searchByBrand(@Param('brand') brand: string): Promise<Laptop[]> {
        return await this.laptopService.searchByBrand(brand);
    }
}