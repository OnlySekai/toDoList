const express=require('express')
const router=express.Router()
const tasks=require('../controller/Tasks')

router.route(`/`).get(tasks.getAllTasks).post(tasks.createTask)
router.route('/:id').patch(tasks.updateTask).get(tasks.getTask).delete(tasks.deleteTask)

module.exports=router