const BLOGSCHEMA = require("../models/blogs.modal");
// importing the collection from models folder to perform CRUD


exports.addBlog = async (req,res)=>{
    let {title, description} = req.body;

    console.log(req.body);
    console.log(title,description)

    let newBlog =await BLOGSCHEMA.create({title,description})

    res.send("Data Submitted");


}
exports.fetchOneBlog = async (req,res)=>{

}
exports.fetchAllBlog = async (req,res)=>{

}
exports.deleteBlog = async (req,res)=>{

}
exports.updateBlog = async (req,res)=>{

}