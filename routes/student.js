const router = require('express').Router()
const Student = require('../models/student');
const faker = require('faker')
const Class = require('../models/class');
const ClassArray = async()=>{
    const resp = await Class.find();
    return resp;
}
//clone student
router.post('/clone',async(req,res)=>{
    const student = new Student({
        name: faker.name.findName(),
    })
})
//create new student
router.post('/new',async(req,res)=>{
    const student  = new Student({
        name:req.body.name,
        class: req.body.class,
        birthday: req.body.birthday,
        address:req.body.address,
        idteacher: req.user._id
    })
    try {
        await student.save();
    } catch (error) {
        res.json({error:"Something went wrong!!"});
    }
})



module.exports=router;