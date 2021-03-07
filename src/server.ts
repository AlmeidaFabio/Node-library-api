import { app } from './app'

app.listen(process.env.PORT || 3002, () => {
    console.log("Server is running!")
})