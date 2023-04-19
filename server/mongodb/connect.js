import mongoose from 'mongoose';


// 连接 mongoDB 
const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose.connect(url)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log(err))

}


export default connectDB;