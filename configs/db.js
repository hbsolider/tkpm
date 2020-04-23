const mongoose = require('mongoose');
module.exports={
    connect: async () => {
        try {
            await mongoose.connect(process.env.DB, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, () => {
                console.log('Connected to Db');
            })
        } catch (error) {
            console.log(error);
        }
    }
}