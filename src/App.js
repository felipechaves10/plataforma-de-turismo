
import express from 'express'
import userRoutes from './routes/userRoutes.js'
import placeRoutes from './routes/placeRoutes.js'
const app = express()

app.use(express.json())

app.use('/usuarios', userRoutes)
app.use("/locais", placeRoutes)

export default app