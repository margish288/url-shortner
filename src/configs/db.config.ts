import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/shorturls"
    );
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("##### Connected to database #####");
    });

    connection.on("error", (error) => {
      console.log("##### (On connection) Error connecting to database #####");
      console.log(error);
    });
  } catch (error) {
    console.log("##### (Catch) Error connecting to database #####");
    console.log(error);
  }
}
