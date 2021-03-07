import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("books")
export class Book {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    name:string;

    @Column({default:1})
    available:boolean;

    @Column()
    code:string;

    @ManyToOne(() => User, user => user.books, {
        cascade:true
    })
    user:User;
}