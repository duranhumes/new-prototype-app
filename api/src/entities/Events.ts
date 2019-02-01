import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from 'typeorm';

@Entity('events')
export class EventsEntity {
    /**
     * This is to keep it consistent and easy names
     * for the api user to not have to remember the
     * actual column names.
     */
    shortDescription: string | undefined;
    fullDescription: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', length: 255 })
    title: string | undefined;

    @Column({ type: 'varchar', length: 255 })
    // tslint:disable-next-line:variable-name
    short_description: string | undefined;

    @Column({ type: 'varchar', length: 255 })
    // tslint:disable-next-line:variable-name
    full_description: string | undefined;

    @Column({ type: 'datetime' })
    start: string | undefined;

    @Column({ type: 'datetime' })
    end: string | undefined;

    @AfterLoad()
    handleColumnNames() {
        this.shortDescription = this.short_description;
        this.fullDescription = this.full_description;
        this.startDate = this.start;
        this.endDate = this.end;

        this.short_description = undefined;
        this.full_description = undefined;
        this.start = undefined;
        this.end = undefined;
    }
}
