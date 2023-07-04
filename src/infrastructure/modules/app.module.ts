import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laptop } from 'src/core/entities/laptop.entity';
import { User } from 'src/core/entities/user.entity';
import { AccountModule } from './account.module';
import { ContactModule } from './contact.module';
import { LaptopModule } from './laptop.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'your_host',
            port: 5432,
            username: 'user_name',
            password: 'password',
            database: 'dbname',
            entities: [User, Laptop],
            synchronize: true,
            autoLoadEntities: true
        }),
        AccountModule,
        LaptopModule,
        ContactModule
    ],
    providers: []
})
export class AppModule { }
