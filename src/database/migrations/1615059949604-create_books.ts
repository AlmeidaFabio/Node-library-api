import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createBooks1615059949604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"books",
                columns: [
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"name",
                        type:"varchar"
                    },
                    {
                        name:"available",
                        type:"tinyint",
                        default:true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("books")
    }

}
