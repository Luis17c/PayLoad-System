import { Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Transactions{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(() => Users, (users) => users.id)
    @JoinTable()
    payerId: Users[]

    @OneToMany(() => Users, (users) => users.id)
    @JoinTable()
    receiverId: Users[]
    
    @Column('decimal')
    value: number

    @CreateDateColumn()
    madeAt: Date
}