const router = require('express').Router()
const Class = require('../models/class');
const Student = require('../models/student')

router.post('/new', async (req, res) => {
    try {
        const newclass = new Class({
            number: req.body.name,
            description: req.body.description,
            idteacher: req.user._id
        })
        await newclass.save()
        res.json({ check: true });
    } catch (error) {
        res.json({ check: false });
    }

})
router.delete('/delete/:id', async (req,res) => {
    try {
        await Class.findOne({ _id: req.params.id }).then(async (resp) => {
            await Student.updateMany({ 'class': resp.number }, { "$set": { "class": 0 } })
        })
        await Class.deleteOne({ _id: req.params.id })
        res.status(200).send()
    } catch (error) {
        res.status(400).send({ error: error })
    }
})
module.exports = router