import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContactDto } from "../common/dtos/contact.dto";
import { Contact } from "../entities/contact.entity";

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact)
        private contactRepo: Repository<Contact>
    ) { }

    async findAll(): Promise<Contact[]> {
        return await this.contactRepo.find();
    }

    async findById(id: string): Promise<Contact> {
        return await this.contactRepo.findOneBy({ id: id });
    }

    async create(model: ContactDto): Promise<Contact> {
        return await this.contactRepo.save(model);
    }

    async delete(id: string): Promise<void> {
        await this.contactRepo.delete(id);
    }
}