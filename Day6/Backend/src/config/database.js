const mongoose=require("mongoose");

async function connecttoDb(){
  const mongoUri=process.env.MONGO_URI || process.env.MONGODB_URI;

  if(!mongoUri){
    throw new Error(
      "MongoDB connection string is missing. Set the MONGO_URI environment variable."
    );
  }

  await mongoose.connect(mongoUri);
  console.log("connect to database");
}

module.exports=connecttoDb;