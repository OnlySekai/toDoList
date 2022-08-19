const asyncWrapper=require(`../middleware/Async`)
const tasks=require(`../model/Tasks`)
const customErrorAPI=require(`../error/custom-err`)
const getAllTasks= asyncWrapper(async (req,res,next)=>{
    const task=await tasks.find()
    res
     .status(200)
     .json({numItem:task.length,data:task})
})
const createTask= asyncWrapper(async (req,res,next)=>{
    const task= await tasks.create(req.body)
    res
     .status(200)
     .json(task)
})
const getTask=asyncWrapper(async (req,res,next)=>{
    const {id:taskId}=req.params
    const task=await tasks.findOne({_id:taskId})
    if (!task){
        err=new customErrorAPI(`don't have any task with id ${req.params.id}`,404)
        return next(err)
    }
    res
     .status(200)
     .json({task})
})
const updateTask= asyncWrapper(async (req,res,next)=>{
    const task=await tasks.findOneAndUpdate({_id:req.params.id},req.body,{
        new: true,
        runValidators: true,
    })
    if (!task){
        err=new customErrorAPI(`don't have any task with id ${req.params.id}`,404)
        return next(err)
    }
    res
     .status(200)
     .json({task})
})
const deleteTask= asyncWrapper(async (req,res,next)=>{
    var a= "all"
    if (a.localeCompare(req.body)){
        tasks.deleteMany()
        res.status(200).send("clear all")
        return           
        }
    const task=await tasks.findOneAndDelete({_id:req.params.id})
    if (!task){
        err=new customErrorAPI(`don't have any task with id ${req.params.id}`,404)
        return next(err)
    }
    res
     .status(200)
     .json(task)
})

module.exports={
    getAllTasks,
    updateTask,
    getTask,
    deleteTask,
    createTask
}