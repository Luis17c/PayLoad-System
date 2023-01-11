import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from  'typeorm'
@Entity()
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    cpfOrCnpj: string
    
    @Column('boolean')
    shopkeeper: boolean

    @Column('decimal')
    balance: number

    @Column('varchar')
    password: string;

    @Column('varchar')
    name: string;

    @Column('date')
    birth: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}