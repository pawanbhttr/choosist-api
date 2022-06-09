import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Laptop {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column()
    os: string;

    @Column()
    processor: string;

    @Column()
    ram: number;

    @Column()
    ssd: number;

    @Column()
    hdd: number;

    @Column("decimal")
    screen: number;

    @Column()
    graphics: number;

    @Column()
    battery: string;

    @Column()
    description: string;

    @Column("decimal")
    price: number;

    @Column()
    purchaseUrl: string;

    @Column()
    imageUrl: string;
}