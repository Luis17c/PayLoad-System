import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { users } from "./users";

@Entity()
export class transactions{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(() => users, (users) => users.id)
    @JoinTable()
    payerId: users[]

    @OneToMany(() => users, (users) => users.id)
    @JoinTable()
    receiverId: users[]
    
    @Column('decimal')
    value: number

    @CreateDateColumn()
    madeAt: Date
}