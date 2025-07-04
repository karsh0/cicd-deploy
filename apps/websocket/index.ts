import { WebSocketServer } from "ws";
import { prisma } from "db/index"

const wss = new WebSocketServer({port:8080})

wss.on("connection", (ws)=>{
    ws.on("message",(data)=>{
        ws.send("connected!")
    })
})