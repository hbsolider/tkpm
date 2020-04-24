const router = require('express').Router()
const auth = require('../middlewares/auth');
const Student = require('../models/student');
const Class = require('../models/class');
router.get('/', (req, res) => {
    res.render('index')
})
router.get('/class', auth, async (req, res) => {
    await Class.find({ 'idteacher': req.user._id }).then((data) => {
        res.render('Academy-class', {
            data: data
        })
    })
})
router.get('/academy/:id', auth, async (req, res, next) => {
    if (typeof (req.params.id) === 'undefined' || req.params.id === -1) {
        next()
    } else {
        var check = false;
        var arrcl = [];
        await Class.find({ 'idteacher': req.user._id }).then(data => {
            data.forEach((e) => {
                arrcl.push(e.number);
            })
        })
        for (var i = 0; i < arrcl.length; i++) {
            if (req.params.id === arrcl[i]) {
                check = true;
            }
        }
        if (!check) {
            next();
        }
        else {
            const students = await Student.find({ 'class': req.params.id, 'idteacher': req.user._id });
            res.render('Academy', {
                students,
                Class: arrcl,
                check: req.params.id
            })
        }

    }
})
router.get('/academy', auth, async (req, res) => {
    var arrcl = [];
    await Class.find({ 'idteacher': req.user._id }).then(data => {
        data.forEach((e) => {
            arrcl.push(e.number);
        })
    })
    const students = await Student.find({ 'idteacher': req.user.id });
    res.render('Academy', {
        students,
        Class: arrcl,
        check: -1
    })
})



module.exports = router;