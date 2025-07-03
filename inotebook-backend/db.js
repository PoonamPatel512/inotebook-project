const mongoose = require('mongoose')  //thie is common js . if we do import it is e6.

const connectToMongo = () =>{
    mongoose.connect("mongodb://localhost:27017/inotebook")
    .then(() => console.log('MongoDB connected successfully'))
}

module.exports = connectToMongo;