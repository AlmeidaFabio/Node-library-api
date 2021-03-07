import { Request, Response, Router } from "express";
import { BookController } from "./controllers/BookController";
import { RentController } from "./controllers/RentController";
import { UserController } from "./controllers/UserController";

const router = Router()

const userController = new UserController()
const booksController = new BookController()
const rentsController = new RentController()

router.get('/ping', (request:Request, response:Response) => {
    return response.json({pong:true})
})

router.post('/user', userController.create)
router.get('/users', userController.read)
router.get('/user/:id', userController.read)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.delete)

router.post('/book', booksController.create)
router.get('/books', booksController.read)
router.get('/book/:id', booksController.read)
router.put('/book/:id', booksController.update)
router.delete('/book/:id', booksController.delete)

router.put('/rent/:id', rentsController.execute)

export { router }