const mongoose = require("mongoose")

// here we are creating schema/structutre for the input data
const blogschema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    description:{
        type: String,
        required:true,
        trim: true,

    }
})

// after  that, we are defining a model/ collection based on that schema
module.exports = mongoose.model("Blog",blogschema) //save schemea with "blogs",  make it lowercase and  