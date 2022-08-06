import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { merge } from "lodash";
import { DataSource, Repository } from "typeorm";
import { LaptopDto } from "../common/dtos/laptop.dto";
import { SearchLaptopDto } from "../common/dtos/search-laptop.dto";
import { LaptopUsage } from "../common/enums/laptop-usage.enum";
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
        let whereClause = "";
        if(LaptopUsage.Personal == model.usage){
            whereClause = " AND laptop.graphics >= 4 AND laptop.processor in ('i3','i5','i7') AND laptop.ram >= 4"
        } else {
            whereClause = " AND laptop.processor in ('i5','i7','i9') AND laptop.ram >= 8"
        }
        
        const laptops = await this.dataSource.manager
            .createQueryBuilder(Laptop, "laptop")
            .where("laptop.price <= :price_upto" + whereClause, {
                price_upto: model.price_upto
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