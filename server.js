const express = require("express")
const { PORT } = require("./config")
const {connectDB} = require("./config/database")

const blogRouter = require("./routers/blogs.router")

connectDB();


const app= express();

app.use(express.urlencoded({extended:true,}))

app.use("/blogs",blogRouter)

// console.log("port is",PORT)

app.listen(PORT,(err)=>{
    if(err) console.log(err);
    console.log("Server is running at PORT:",PORT);
})