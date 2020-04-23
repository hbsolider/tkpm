const router = require('express').Router()
const Class = require('../models/class');


router.post('/new',async (req, res) => {
    try {
        const newclass= Class({
            number:req.body.name,
            description:req.body.description,
            idteacher:req.user._id
        })
        await newclass.save()
        res.json({check:true});
    } catch (error) {
        res.json({check:false});
    }
    
})

module.exports = router