import { EntityRepository, Repository } from "typeorm";
import { Book } from "../database/entities/Book";

@EntityRepository(Book)
export class BookRepo extends Repository<Book> {}