import { Module } from '@nestjs/common';
import { LaptopService } from 'src/core/services/laptop.service';
import { LaptopController } from 'src/application/controllers/laptop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laptop } from 'src/core/entities/laptop.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Laptop])],
    controllers: [LaptopController],
    providers: [LaptopService]
})
export class LaptopModule { }
