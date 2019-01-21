import { Entity, PrimaryGeneratedColumn, Column, JoinTable } from 'typeorm';

import { CategoryEntity } from './Category';

@Entity('items')
export class ListingsEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', length: 255 })
    title: string | undefined;

    @Column({ type: 'varchar', length: 255 })
    info: string | undefined;

    @Column({ type: 'varchar', length: 255 })
    address: string | undefined;

    @Column({ type: 'varchar', length: 255 })
    phone: string | undefined;

    @Column({ type: 'varchar', length: 255 })
    email: string | undefined;

    @Column({ type: 'varchar', length: 255 })
    website: string | undefined;

    @Column({ type: 'int' })
    latitude: string | undefined;

    @Column({ type: 'int' })
    longitude: string | undefined;

    @JoinTable({ name: 'items_to_categories' })
    category: CategoryEntity[] = [];
}
