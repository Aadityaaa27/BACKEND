
require("dotenv").config()
const app=require("./src/app")
const connecttoDb=require("./src/config/database")

const port=process.env.PORT || 3000;

async function startServer(){
  try{
    await connecttoDb();
    app.listen(port,()=>{
      console.log(`server is running on port ${port}`);
    });
  }catch(error){
    console.error("Failed to start server:",error.message);
    process.exit(1);
  }
}

startServer();
