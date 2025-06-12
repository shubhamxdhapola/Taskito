import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectToDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import uploadRoutes from './routes/uploadRoute.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import reportRoutes from './routes/reportRoutes.js'

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/reports', reportRoutes)

app.listen(PORT, () => {
    connectToDb()
    console.log(`Server is running at PORT ${PORT}`)
})