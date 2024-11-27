const USERSCHEMA = require("../models/users.model");
const {generateToken} = require("../utils/generateToken")

exports.addUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    console.log(username, email, password)

    let existingUser = await USERSCHEMA.findOne({email})

    if(existingUser){
      return res.status(400).json({success: false , message: "User email already exist"})
    }

    let newUser = await USERSCHEMA.create({
      username,
      email,
      password,
    });

    res.status(201).json({ success: true, message: "User Added Successfully !" ,newUser} );

  } catch (error) {
    console.log("Error while creating a user");
    res.status(201).json({success:false,message:error});
  }
};

exports.fetchAllUsers = async (req,res)=>{

try {
  let users = await USERSCHEMA.find();
  if(users.length === 0) return res.status(200).json({success:true, message:"no user found"})

    res.status(200).json({success:true,message:"User fetched successfully",count:users.length, users});
  
} catch (error) {
  console.log("error whie fetching all the users")
  res.status(500).json({success:false,message:error});
  
}
}

exports.fetchOneUser = async (req, res) => {
  try {
    let { id } = req.params;

    let findUser = await USERSCHEMA.findById(id);

    if (!findUser) return res.status(200).json({ message: "no user found" });

    res.status(200).json({ success: true, message: "user fetched successfully", findUser });
  } catch (error) {
    console.log("error while fetching single user");
    res.status(500).json({ success: false, message: error });
  }
};


exports.updateUser = async (req, res) => {
  try {
    let { id } = req.params;

    let findUser = await USERSCHEMA.findById(id);

    if (!findUser) return res.status(200).json({ message: "no user found" });

    //! 1)

    // await USER_SCHEMA.updateOne(
    //   { _id: id },
    //   { $set: { username: req.body.username, password: req.body.password, email: req.body.email } }
    // );

    //! 2)
    findUser.username = req.body.username || findUser.username;
    findUser.email = req.body.email || findUser.email;
    findUser.password = req.body.password || findUser.password;

    await findUser.save();

    res.status(200).json({ success: true, message: "user updated successfully" });
  } catch (error) {
    console.log("error while updating a user");
    res.status(500).json({ success: false, message: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let { id } = req.params;

    let user = await USERSCHEMA.findById(id);

    if (!user) return res.status(200).json({ message: "no user found" });

    let deletedUser = await USERSCHEMA.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "user deleted", deletedUser });
  } catch (error) {
    console.log("error while deleting a user");
    res.status(500).json({ success: false, message: error });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.params;
  let findUser = await USERSCHEMA.findOne({ email });

  if (!findUser) return res.status(401).json({ message: "PLease Register" });
  let isMatched = await findUser.verifyPassword(password);
  console.log(isMatched);

  if(!isMatched) return res.status(401).json({message:"Wrong password !"})

    let token = generateToken(findUser._id);
    // console.log(token)

    res.cookie("myCookie",token, {
      maxAge: 1*60 *60*1000,    // 1 hr in ms
      httpOnly:true,     //it can not be modified by browser.
    })

    res.status(200).json({success:true, message:"User Logged In",token:token,})
};
