import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from 'typeorm';

@Entity('news')
export class NewsEntity {
    /**
     * This is to keep it consistent and easy names
     * for the api user to not have to remember the
     * actual column names.
     */
    text: string | undefined;
    date: string | undefined;
    heading: string | undefined;

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', length: 255 })
    title: string | undefined;

    @Column({ type: 'varchar', length: 255 })
    // tslint:disable-next-line:variable-name
    news_text: string | undefined;

    @Column({ type: 'varchar', length: 255 })
    // tslint:disable-next-line:variable-name
    news_heading: string | undefined;

    @Column({ type: 'datetime' })
    // tslint:disable-next-line:variable-name
    news_date: string | undefined;

    @Column({ type: 'varchar', length: 255 })
    image: string | undefined;

    @AfterLoad()
    handleColumnNames() {
        this.date = this.news_date;
        this.text = this.news_text;
        this.heading = this.news_heading;

        this.news_date = undefined;
        this.news_text = undefined;
        this.news_heading = undefined;
    }
}
