const BLOGSCHEMA = require("../models/blogs.modal");
// importing the collection from models folder to perform CRUD

exports.addBlog = async (req, res) => {
  try {
    let { title, description } = req.body;

    let newBlog = await BLOGSCHEMA.create({ title, description });

    res.json({ success: true, message: "Data Inserted Successfully", newBlog });
  } catch (error) {
    console.log("error while creating a blog");
    console.log({ sucess: false, message: error });
  }
};

exports.fetchAllBlogs = async (req, res) => {
    try {
        let allBlogs = await BLOGSCHEMA.find();
        res.json({success: true, message: "All Blogs Fetched", data: allBlogs, count: allBlogs.length})
        
    } catch (error) {
        console.log("Error while fetching one blog");
        console.log(first)
        
    }
};

exports.fetchOneBlog = async (req, res) => {
    let {id} =  req.params;
    try {
        let blog = await BLOGSCHEMA.findOne({_id:id});
        res.json({sucess: true, message: "data fetched",data: blog});
        
    } catch (error) {
        console.log("Error While Fetch One Blog")
        res.json({success:false, message: error})        
    }
};

exports.deleteBlog = async (req, res) => {
 
  try {

    let {id} = req.params;
    let blog = await BLOGSCHEMA.findOne({_id:id})

    if(!blog){
      return res.status(400).json({success: "false", message:"no blog found"})
    }

    await BLOGSCHEMA.deleteOne({_id:id})
    res.status(200).json({success:"true", message:" Blog Deleted:!"})

  } catch (error) {
    console.log("error in deleting blog")
    res.status(500).json({success:"false", message:error.message})
    
  }


};

exports.updateBlog = async (req, res) => {

  try {
    let {id} = req.params;
    let findblog = await BLOGSCHEMA.findOne({_id:id})
  
    if(!findblog){
      return res.status(400).json({success: "false", message:"no such blog found"})
    }  

    await BLOGSCHEMA.updateOne(
      {_id:id},
      { $set:{
        title: req.body.title,
        description: req.body.description,
      },
    })

    res.status(200).json({success: "true", message:"Blog Updated"})

    
  } catch (error) {
    console.log("Error while Updating Blog")
    res.status(500).json({success:"true",message:error})
    
  }


};


