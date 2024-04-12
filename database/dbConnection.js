import Mongoose from "mongoose";

export const dbConnection = () => {
  Mongoose.connect(process.env.MONGO_URL, {
    dbName: "MERN_STACK_JOB_PORTAL",
  })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(`Some error occurred: ${err}`);
    });
};

