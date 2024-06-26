import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLIENT_NAME,
    cloud_api: process.env.CLOUDINARY_CLIENT_API,
    cloud_secret: process.env.CLOUDINARY_CLIENT_SECRET
});

app.listen(process.env.PORT,()=>{
    console.log(`server started at ${process.env.PORT}`);
});