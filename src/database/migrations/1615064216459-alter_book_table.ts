import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterBookTable1615064216459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("books", new TableColumn({
            name:"code",
            type:"varchar"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("books", "code")
    }

}
