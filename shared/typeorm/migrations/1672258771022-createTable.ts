import { table } from "console"
import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { users } from "../../../user/infra/typeorm/users"

export class createTable1672258771022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "cpfOrCpnj",
                        type: "varchar",
                    },
                    {
                        name: "shopkeeper",
                        type: "boolean",
                    },
                    {
                        name: "balance",
                        type: "decimal"
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "birth",
                        type: "date"
                    },
                    {
                        name: "createdAt",
                        type: "date",
                        default: "now()"
                    },
                    {
                        name: "updateAt",
                        type: "date",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }
}
