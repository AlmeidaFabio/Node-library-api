import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepo } from "../repositories/UserRepo";

export class UserController {
    async create(request:Request, response:Response) {
        const usersRepository = getCustomRepository(UserRepo)

        try {
            const { name } = request.body;

            const user = usersRepository.create({
                name
            })

            await usersRepository.save(user)

            return response.status(201).json(user)


        } catch (error) {
            return response.status(400).json({error:error})
        }
    }

    async read(request:Request, response:Response) {
        const usersRepository = getCustomRepository(UserRepo)

        const id = request.params.id

        try {
            if(id) {
                const user = await usersRepository.findOne(id)

                return response.json(user)
            } else {
                const users = await usersRepository.find({relations:["books"]})

                return response.json(users)
            }

        } catch (error) {
            return response.json({error:error})
        }
    }

    async update(request:Request, response:Response) {
        const usersRepository = getCustomRepository(UserRepo)

        const id = request.params.id 
        const { name } = request.body
        const user = await usersRepository.findOne(id)

        try {
            if(user) {
                await usersRepository.update(user, {
                    name
                })

                return response.json({message: "User successfully updated!"})
            } else {
                return response.json({error: "This user does not exist!"})
            }
        } catch (error) {
            return response.json({error: error})
        }
    }

    async delete(request:Request, response:Response) {
        const usersRepository = getCustomRepository(UserRepo)

        const id = request.params.id 

        const user = await usersRepository.findOne(id) 

        try {
            if(user) {
                await usersRepository.delete(id)

                return response.json({error: "User successfully deleted!"})
            } else {
                return response.json({error: "This user does not exist!"})
            }
        } catch (error) {
            return response.json({error:error})
        }
    }
}