const { addBlog } = require("../controllers/blogs.controller");

const {Router} = require("express");

const router =  Router();

router.post("/add",addBlog)

module.exports = router;