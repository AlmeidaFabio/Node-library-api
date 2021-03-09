import { Request, Response,  } from "express";
import { getCustomRepository } from "typeorm";
import { BookRepo } from "../repositories/BookRepo";
import * as yup from 'yup';

export class BookController {
    async create(request:Request, response:Response) {
        const bookRepositories = getCustomRepository(BookRepo);
        const { name } = request.body;

        const code = Math.random().toString(36).substr(2, 5);

        const schema = yup.object().shape({
            name: yup.string().required("Name required!"),
        });

        try {
            try {
                await schema.validate(request.body, {abortEarly: false});
            } catch (err) {
                return response.json({error:err});
            }

            const book = bookRepositories.create({
                name,
                code
            })

            await bookRepositories.save(book);

            return response.status(201).json(book)
        } catch (error) {
            return response.status(400).json({error:error})
        }
    }

    async read(request:Request, response:Response) {
        const booksRepository = getCustomRepository(BookRepo)

        const id = request.params.id

        try {
            if(!id) {
                const books = await booksRepository.find()

                return response.json(books)

            } else if(id) {
                const book = await booksRepository.findOne(id)

                return response.json(book)

            } else {
                return response.json({error:"Book does not exist!"})
            }

        } catch (error) {
            return response.json({error:error})
        }
    }

    async update(request:Request, response:Response) {
        const booksrepository = getCustomRepository(BookRepo)

        const { name } = request.body
        const id = request.params.id 

        const schema = yup.object().shape({
            name: yup.string().required("Name required!"),
        });

        try {
            await schema.validate(request.body, {abortEarly: false});
        } catch (err) {
            return response.json({error:err});
        }

        try {
            const book = await booksrepository.findOne(id)

            if(book) {
                await booksrepository.update(id, {
                    name
                })

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
                await booksRepository.delete(id)

                return response.json({message: "Deleted successfully!"})
            } else {
                return response.json({error: "This book does not exist!"})
            }
        } catch (error) {
            return response.json({error:error})
        }
    }
}