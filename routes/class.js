const router = require('express').Router()
const Class = require('../models/class');
const Student = require('../models/student')

router.post('/new', async (req, res) => {
    await Class.findOne({'number':req.body.name,'idteacher':req.user._id}).then(async(have)=>{
        if(have){
            res.status(400).send({error:'Exist name class'})
        }else{
            try {
                const newclass = new Class({
                    number: req.body.name,
                    description: req.body.description,
                    idteacher: req.user._id
                })
                await newclass.save()
                res.status(200).json({ check: true });
            } catch (error) {
                res.status(400).json({ error: error });
            }
        }
    })
   

})
router.delete('/delete/:id', async (req,res) => {
    try {
        await Class.findOne({ _id: req.params.id,'idteacher':req.user._id }).then(async (resp) => {
            await Student.updateMany({ 'class': resp.number }, { "$set": { "class": 0 } })
        })
        await Class.deleteOne({ _id: req.params.id,'idteacher':req.user._id })
        res.status(200).send({success:'success'})
    } catch (error) {
        res.status(400).send({ error: error })
    }
})
module.exports = router