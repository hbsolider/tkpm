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
router.get('/academy', auth, async (req, res) => {
    const students = await Student.find();
    res.render('Academy', {
        students
    })
})
function getClass() {
    var arr = []
    Class.find().then
}
module.exports = router;