import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../../../users/infra/typeorm/Users";

@Entity()
export class Transactions{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Users, (users) => users.id, {eager: true})
    payerId: Users

    @ManyToOne(() => Users, (users) => users.id, {eager: true})
    receiverId: Users
    
    @Column('decimal')
    value: number

    @CreateDateColumn()
    madeAt: Date

    @Column('date', {nullable: true})
    revertedAt: Date
}