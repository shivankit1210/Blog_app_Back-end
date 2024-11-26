const mongoose = require ("mongoose")
const {MONGODB_URL} = require(".")  // ==> (./index)

 exports.connectDB = async () => {
 await mongoose.connect(MONGODB_URL)
 console.log("Database connected successfully !")
}

// module.exports = {
//     connectDB,
// }