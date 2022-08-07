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
            host: 'arjuna.db.elephantsql.com',
            port: 5432,
            username: 'zfpfihbm',
            password: 'RBzlwiAWXEcrC0MV6gPpGYUbZm55RZiQ',
            database: 'zfpfihbm',
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
