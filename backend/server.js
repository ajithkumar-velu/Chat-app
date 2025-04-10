import express from "express"
import {config} from 'dotenv'
import connectDB from "./lib/db.js"
import authRouter from "./routes/authRouter.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import messageRouter from "./routes/MessageRouter.js"
import { app, io, server } from "./lib/socket.js"

import path from 'path'

config()
const PORT = process.env.PORT || 2000
const __dirname = path.resolve()



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:2001",
    // origin: "*",
    methods: ["GET", "POST", "PUT"],
    credentials: true
}))

app.use('/api/user', authRouter)
app.use("/api/message", messageRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

server.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`);
    connectDB()
})
