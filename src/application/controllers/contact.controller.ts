import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ContactDto } from "src/core/common/dtos/contact.dto";
import { Contact } from "src/core/entities/contact.entity";
import { ContactService } from "src/core/services/contact.service";

@ApiTags("Contact")
@Controller("api/contact")
export class ContactController {
    constructor(private contactService: ContactService) { }

    @Get()
    @HttpCode(200)
    async findAll(): Promise<Contact[]> {
        return await this.contactService.findAll();
    }

    @Get(":id")
    @HttpCode(200)
    async find(@Param('id') id: string): Promise<Contact> {
        return await this.contactService.findById(id);
    }

    @Post()
    @HttpCode(200)
    async create(@Body() model: ContactDto): Promise<Contact> {
        return await this.contactService.create(model);
    }

    @Delete(":id")
    @HttpCode(200)
    async delete(@Param('id') id: string): Promise<void> {
        await this.contactService.delete(id);
    }
}