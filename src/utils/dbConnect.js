import mongoose from "mongoose";

const connection = {}

async function dbConnect(uri = process.env.MONGODB_URI) {
    if (connection.isConnected) {
        return;
    }

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }

    const db = await mongoose.connect(uri, options)

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected");
  
    return;
}

export default dbConnect;