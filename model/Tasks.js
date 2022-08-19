const mongoose=require(`mongoose`)

const taskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"must provide"],
        trim:true,
        maxlength:[20,"Name can't not be more than 20"]
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("Tasks",taskSchema)