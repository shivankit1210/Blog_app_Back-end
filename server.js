const express = require("express")
const { PORT } = require("./config")
const {connectDB} = require("./config/database")
const cookieParser = require("cookie-parser")

const blogRouter = require("./routers/blogs.router")
const userRouter = require("./routers/users.router")

connectDB();


const app= express();

app.use(express.urlencoded({extended:true,}))
app.use(express.json());
app.use(cookieParser())

app.use("/blogs",blogRouter)
app.use("/users",userRouter)

// console.log("port is",PORT)

app.listen(PORT,(err)=>{
    if(err) console.log(err);
    console.log("Server is running at PORT:",PORT);
})