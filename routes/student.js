const router = require('express').Router()
const Student = require('../models/student');
const faker = require('faker')
const Class = require('../models/class');
const moment = require('moment');

//clone student
router.post('/clone', async (req, res) => {
    const arrclass = await Class.find({ 'idteacher': req.user._id });
    const arr = getClass(arrclass);
    const student = new Student({
        name: faker.name.findName(),
        class: arr[Math.floor(Math.random() * (arr.length))],
        birthday: moment(faker.date.between('1998-01-01', '2001-12-31')).format("YYYY-MM-DD"),
        idteacher: req.user._id,
        address: faker.address.city()
    })
    try {
        const resp = await student.save()
        res.status(200).send(resp)
    } catch (error) {
        res.status(400).send(error)
    }
})
function getClass(arrclass) {
    const temp = [];
    arrclass.forEach(r => {
        temp.push(r.number);
    })
    return temp;
}
//create new student
router.post('/new', async (req, res) => {
    if (req.body.name == '' || req.body.class == '-1' || req.body.address == '') {
        res.status(400).send({ error: 'The field must not be empty' });
    }
    else {
        const newstudent = new Student({
            name: req.body.name,
            class: req.body.class,
            birthday: req.body.birthday,
            address: req.body.address,
            idteacher: req.user._id
        })
        try {
            const resp = await newstudent.save();
            res.status(200).send({ success: 'success' });
        } catch (error) {
            console.log(error)
            res.status(400).send({ error: error });
        }
    }
})
router.delete('/delete/:id', async (req, res) => {
    try {
        await Student.deleteOne({ _id: req.params.id });
        res.status(200).send({ success: 'success' });
    } catch (error) {
        res.status(400).send({ error: error });
    }
})
router.put('/update/:id', async (req, res) => {
    try {
        await Student.findByIdAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            class: req.body.class,
            address: req.body.address,
            birthday: req.body.birthday
        })
        res.status(200).send({ success: 'success' })
    } catch (error) {
        res.status(400).send({ error })
    }

})


module.exports = router;
