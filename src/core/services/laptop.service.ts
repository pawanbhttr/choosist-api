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
        const laptops = await this.dataSource.manager
            .createQueryBuilder(Laptop, "laptop")
            .where("laptop.brand like :brand OR laptop.os like :os OR laptop.processor = :processor OR laptop.ram = :ram OR laptop.graphics = :graphics OR ((:isSSD = true AND laptop.ssd > 0) OR (:isSSD = false AND laptop.hdd > 0)) OR laptop.ssd >= :ssd OR laptop.hdd >= :hdd OR laptop.screen >= :screen OR (laptop.price >= :greater_price AND :greater_price != 0) OR (laptop.price <= :less_price AND :less_price != 0) OR (:greater_price != 0 AND :less_price != 0 AND laptop.price >= :greater_price AND laptop.price <= :less_price)", {
                brand: '%' + model.brand + '%',
                os: '%' + model.os + '%',
                processor: model.processor,
                ram: model.ram,
                screen: model.screen,
                graphics: model.graphics,
                isSSD: model.isSSD,
                ssd: model.ssd,
                hdd: model.hdd,
                greater_price: model.price_greaterthan,
                less_price: model.price_lessthan
            })
            .getMany();

        return laptops;
    }

    async searchByBrand(brandName: string): Promise<Laptop[]> {
        const laptops = await this.dataSource.manager
            .createQueryBuilder(Laptop, "laptop")
            .where("laptop.brand LIKE :brand", { brand: '%' + brandName + '%' })
            .getMany();

        return laptops;
    }
}