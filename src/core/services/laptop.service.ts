import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { merge } from "lodash";
import { DataSource, Repository } from "typeorm";
import { LaptopDto } from "../common/dtos/laptop.dto";
import { SearchLaptopDto } from "../common/dtos/search-laptop.dto";
import { Laptop } from "../entities/laptop.entity";

@Injectable()
export class LaptopService {
    constructor(
        @InjectRepository(Laptop)
        private laptopRepository: Repository<Laptop>,
        private dataSource: DataSource
    ) { }

    async findAll(): Promise<Laptop[]> {
        return await this.laptopRepository.find();
    }

    async findById(id: string): Promise<Laptop> {
        return await this.laptopRepository.findOneBy({ id: id });
    }

    async create(model: LaptopDto): Promise<Laptop> {
        const laptop = new Laptop();
        laptop.name = model.name;
        laptop.os = model.os;
        laptop.battery = model.battery;
        laptop.brand = model.brand;
        laptop.description = model.description;
        laptop.graphics = model.graphics;
        laptop.hdd = model.hdd;
        laptop.imageUrl = model.imageUrl;
        laptop.price = model.price;
        laptop.processor = model.processor;
        laptop.purchaseUrl = model.purchaseUrl;
        laptop.ram = model.ram;
        laptop.screen = model.screen;
        laptop.ssd = model.ssd;
        return await this.laptopRepository.save(laptop);
    }

    async update(id: string, model: LaptopDto): Promise<void> {
        const laptop = await this.laptopRepository.findOneBy({ id: id });
        laptop.name = model.name;
        laptop.os = model.os;
        laptop.battery = model.battery;
        laptop.brand = model.brand;
        laptop.description = model.description;
        laptop.graphics = model.graphics;
        laptop.hdd = model.hdd;
        laptop.imageUrl = model.imageUrl;
        laptop.price = model.price;
        laptop.processor = model.processor;
        laptop.purchaseUrl = model.purchaseUrl;
        laptop.ram = model.ram;
        laptop.screen = model.screen;
        laptop.ssd = model.ssd;
        await this.laptopRepository.save(laptop);
    }

    async delete(id: string): Promise<void> {
        await this.laptopRepository.delete(id);
    }

    async search(model: SearchLaptopDto): Promise<Laptop[]> {

        if (model.processor == null)
            model.processor = "";
        if (model.os == null)
            model.os == "";

        const laptops = await this.dataSource.manager
            .createQueryBuilder(Laptop, "laptop")
            .where(`(
                laptop.price <= :price_upto OR :price_upto = 0) 
                AND ((laptop.screen BETWEEN :screen_greaterthan AND :screen_lessthan) OR (:screen_greaterthan = 0 AND :screen_lessthan = 0)) 
                AND (UPPER(laptop.os) = UPPER(:os) OR :os = '') 
                AND ((laptop.graphics BETWEEN :graphics_greaterthan AND :graphics_lessthan) OR (:graphics_greaterthan = 0 AND :graphics_lessthan = 0))
                AND ((laptop.ram BETWEEN :ram_greaterthan AND :ram_lessthan) OR (:ram_greaterthan = 0 AND :ram_lessthan = 0))
                AND ((laptop.ssd BETWEEN :ssd_greaterthan AND :ssd_lessthan) OR (:ssd_greaterthan = 0 AND :ssd_lessthan = 0))
                AND (UPPER(laptop.processor) = UPPER(:processor) OR :processor = ''
            )`, {
                price_upto: model.price_upto,
                screen_greaterthan: model.screen_greaterthan,
                screen_lessthan: model.screen_lessthan,
                os: model.os,
                graphics_greaterthan: model.graphics_greaterthan,
                graphics_lessthan: model.graphics_lessthan,
                ram_greaterthan: model.ram_greaterthan,
                ram_lessthan: model.ram_lessthan,
                ssd_greaterthan: model.ssd_greaterthan,
                ssd_lessthan: model.ssd_lessthan,
                processor: model.processor
            })
            .getMany();

        return laptops;
    }

    async searchByBrand(brandName: string): Promise<Laptop[]> {
        const laptops = await this.dataSource.manager
            .createQueryBuilder(Laptop, "laptop")
            .where("UPPER(laptop.brand) LIKE :brand", { brand: '%' + brandName.toUpperCase() + '%' })
            .getMany();

        return laptops;
    }
}