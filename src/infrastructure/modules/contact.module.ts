import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from 'src/application/controllers/contact.controller';
import { Contact } from 'src/core/entities/contact.entity';
import { ContactService } from 'src/core/services/contact.service';

@Module({
    imports: [TypeOrmModule.forFeature([Contact])],
    controllers: [ContactController],
    providers: [ContactService]
})
export class ContactModule { }
