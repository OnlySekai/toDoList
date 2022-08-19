const express=require('express')
const mongoose=require('mongoose')
const app=express()
const tasks=require('./routes/Tasks')
const notFound=require(`./middleware/notFound`)
const errorHandlerMiddleware=require(`./middleware/error-handler`)
require('dotenv').config()
//middleware
app.use(express.json())


//route
app.use('/api/v1/tasks', tasks)
app.use(errorHandlerMiddleware)
app.use(notFound)

const PORT=process.env.PORT||5000

const start =async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true

        })
        app.listen(PORT,console.log(`LISTENNING ON PORT ${PORT}`))
    }catch(err){
        console.log(err)
    }
}
start()