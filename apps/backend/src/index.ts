import express from "express"
import { prisma } from "db/index"

const app = express()
app.use(express.json())

app.get('/', async(req,res)=>{
    const todos = await prisma.todo.findMany();

    res.json({
        todos
    })
})

app.post('/user', async(req,res)=>{
    const {name, password} = req.body;

    try{
        const user = await prisma.user.create({
            data:{
                name,
                password
            }
        })
        //@ts-ignore
        req.userId = user.id

        res.json({
            message:"user created successfully"
        })
    }catch(e){
        res.json({
            e
        })
    }
})

app.post('/todo', async(req,res)=>{
    const {task, done} = req.body;

    try{

        await prisma.todo.create({
            data:{
                task,
                done,
                //@ts-ignore
                userId: req.userId
            }
        })
        
        res.json({
            message:"todo created"
        })
    }catch(e){
        res.json({e})
    }
})

app.listen(3000, ()=>{
    console.log("app listening on port 3000")
})