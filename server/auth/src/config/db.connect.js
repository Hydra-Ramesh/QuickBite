import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "quickbite",
        });
        console.log("Connected to the database successfully");
    }catch(e){
        console.error("Error connecting to the database", e);
        process.exit(1);
    }
}

export default connectDB;