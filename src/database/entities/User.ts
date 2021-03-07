import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id:number;
    
    @Column()
    name:string;

    @OneToMany(() => Book, book => book.user)
    books: Book[];
}