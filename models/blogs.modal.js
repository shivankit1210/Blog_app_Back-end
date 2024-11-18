const mongoose = require("mongoose")

// here we are creating schema/structutre for the input data
const blogschema = new mongoose.Schema({
    title:{
        type: String,
    },
    description:{
        type: String,

    }
})

// after  that, we are defining a model/ collection based on that schema
module.exports = mongoose.model("Blog",blogschema) 