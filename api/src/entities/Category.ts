import { Entity, PrimaryGeneratedColumn, Column, JoinTable } from 'typeorm';

import { ListingsEntity } from './Listings';

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', length: 255 })
    category: string | undefined;

    @Column({ type: 'varchar', length: 255 })
    keywords: string | undefined;

    @JoinTable({ name: 'items_to_categories' })
    item: ListingsEntity[] = [];
}
