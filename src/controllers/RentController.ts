import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Book } from "../database/entities/Book";
import { BookRepo } from "../repositories/BookRepo";
import { UserRepo } from "../repositories/UserRepo";

export class RentController {
    async execute(request:Request, response:Response) {
        const { bookCode } = request.body
        const id = request.params.id

        const booksRepository = getCustomRepository(BookRepo)
        const usersRepository = getCustomRepository(UserRepo)

        const book = await booksRepository.findOne({where: {code: bookCode}})
        const user = await usersRepository.findOne({where: {id: id}})

        try {
            if(book) {
                if(book['available'] === true) {
                    await booksRepository.createQueryBuilder()
                    .update(Book)
                    .set({ available:false, user:user})
                    .where("code = :code", { code: bookCode})
                    .execute();
                    
                    return response.json({message: "Rental done successfully"})
                } else {
                    return response.json({error:"This book does not available!"})
                }    
            } else {
                return response.json({error:"This book does not exit!"})
            }
        } catch (error) {
            return response.json({error:error})
        }
        
    }
}