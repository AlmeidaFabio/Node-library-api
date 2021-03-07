require('dotenv').config()
import 'reflect-metadata'
import express, { json, urlencoded } from 'express';
import { router } from './routes';
import createConnection from './database';

createConnection()
const app = express();
app.use(urlencoded({ extended:true }))
app.use(json())

app.use('/api', router)

export { app }