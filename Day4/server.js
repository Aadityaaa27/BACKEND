const app=require("./src/app");
const mongoose=require("mongoose");

function connectTodb(){
  mongoose.connect("mongodb+srv://aadi27003_db_user:nxvklKt3iYef6gLM@cluster0.ouzs3jd.mongodb.net/Day-4").then(()=>{
    console.log("connected to database");
  })
}
connectTodb();


app.listen((3000),(res,req)=>{
  console.log("server is running on 3000 server")
});