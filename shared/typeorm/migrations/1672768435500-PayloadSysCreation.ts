import { Column, DriverOptionNotSetError, MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class PayloadSysCreation1672768435500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "payerId",
                        type: "uuid"
                    },
                    {
                        name: "receiverId",
                        type: "uuid"
                    },
                    {
                        name: "value",
                        type: "decimal"
                    },
                    {
                        name: "madeAt",
                        type: "date",
                        default: "now()"
                    }
                ]
            }) 
        )

        await queryRunner.createForeignKey('transactions', new TableForeignKey({
            name: "payerIdKey",
            columnNames: ['payerId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))

        await queryRunner.createForeignKey('transactions', new TableForeignKey({
            name: "receiverIdKey",
            columnNames: ['receiverId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions', 'receiverIdKey')

        await queryRunner.dropForeignKey('transactions', 'payerIdKey')
        
        await queryRunner.dropTable('transactions')
    }

}
