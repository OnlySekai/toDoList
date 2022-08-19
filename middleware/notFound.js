const notFound = (req,res,next)=>{
    res.status(404).send('UNKNOW')
}
module.exports = notFound