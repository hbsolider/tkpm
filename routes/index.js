const router = require('express').Router()
const auth = require('../middlewares/auth');
const Student = require('../models/student');
const Class = require('../models/class');
router.get('/', (req, res) => {
    res.render('index')
})
router.get('/class', auth, async (req, res) => {
    await Class.find().then((data) => {
        res.render('Academy-class', {
            data: data
        })
    })
})
router.get('/academy/:id',auth,async(req,res,next)=>{
    if(typeof(req.params.id)==='undefined'||req.params.id===-1){
        next()
    }else{
        var check = false;
        const arrcl = await getClass()
        for(var i =0;i<arrcl.length;i++){
            if(req.params.id===arrcl[i]){
                check=true;
            }
        }
        if(!check){
            next();
        }
        const students = await Student.find({'class':req.params.id});
        res.render('Academy', {
            students,
            Class: arrcl,
            check:req.params.id
        })
    }
})
router.get('/academy', auth, async (req, res) => {
    const arrcl = await getClass()
    const students = await Student.find();
    res.render('Academy', {
        students,
        Class: arrcl,
        check:-1
    })
})


async function getClass() {
    var arr = []
    await Class.find().then(data=>{
        data.forEach((e)=>{
            arr.push(e.number);
        })  
    })
    return arr;
}
module.exports = router;