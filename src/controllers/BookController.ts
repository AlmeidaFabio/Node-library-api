import { Request, Response,  } from "express";
import { getCustomRepository } from "typeorm";
import { Book } from "../database/entities/Book";
import { BookRepo } from "../repositories/BookRepo";

export class BookController {
    async create(request:Request, response:Response) {
        const bookRepositories = getCustomRepository(BookRepo)

        try {
            const { name } = request.body

            const code = Math.random().toString(36).substr(2, 5);

            const book = await bookRepositories.createQueryBuilder()
            .insert()
            .into(Book)
            .values([
                {name: name, code:code}
            ])
            .execute()

            return response.status(201).json(book)
        } catch (error) {
            return response.status(400).json({error:error})
        }
    }

    async read(request:Request, response:Response) {
        const booksRepository = getCustomRepository(BookRepo)

        const id = request.params.id

        try {
            if(id) {
                const book = await booksRepository.createQueryBuilder("book")
                .where("book.id = :id", { id: id })
                .getOne();

                return response.json(book)

            } else {
                const books = await booksRepository.createQueryBuilder("books")
                .getMany();

                return response.json(books)
            }

        } catch (error) {
            return response.json({error:error})
        }
    }

    async update(request:Request, response:Response) {
        const booksrepository = getCustomRepository(BookRepo)

        const { name } = request.body
        const id = request.params.id 

        try {
            const book = await booksrepository.findOne(id)

            if(book) {
                await booksrepository.createQueryBuilder()
                .update(Book)
                .set({name: name})
                .where("id = :id", {id: id})
                .execute()
            } else {
                return response.json({error: "This book does not exist!"})
            }

            return response.json({message: "Updated successfully!"})

        } catch (error) {
            return response.json({error:error})
        }
    }

    async delete(request:Request, response:Response) {
        const booksRepository = getCustomRepository(BookRepo)

        const id = request.params.id 

        try {
            const book = await booksRepository.findOne(id)

            if(book) {
                await booksRepository.createQueryBuilder()
                .delete()
                .from(Book)
                .where("id = :id", {id:id})
                .execute()

                return response.json({message: "Deleted successfully!"})
            } else {
                return response.json({error: "This book does not exist!"})
            }
        } catch (error) {
            return response.json({error:error})
        }
    }
}