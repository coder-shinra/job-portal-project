class ErrorHandler extends Error {
    constructor (message, statusCode){
        super(message);
        this.statusCode=statusCode;
    }
};

export const errorMiddleware = (err,req,res,next) => {
    err.message = err.message || "Internal Server Error";
    err.message = err.statusCode || 500;

if (err.name === "CaseError"){
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler (message,400);
};

if (err.name === 11000){
    const message = `Duplicated ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler (message,400);
};

if (err.name === "JsonWebTokkenError"){
    const message = `Json Web Tokken is Invalid, Try Again`;
    err = new ErrorHandler (message,400);
};

if (err.name === "TokkenExpiredError"){
    const message = `Json Web Tokken is Expired, Try Again`;
    err = new ErrorHandler (message,400);
};
return res.status(statusCode).json({success:false, message :err.message});
};

export default ErrorHandler;