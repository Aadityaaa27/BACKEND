const mongoose=require("mongoose");

function connecttoDb(){
  mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connect to database");
  })
}

module.exports=connecttoDb;