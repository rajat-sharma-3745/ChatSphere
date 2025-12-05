const errorMiddleware = (err, req, res, next) => {
    console.log(err)
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.code === 11000) {
        const error = Object.keys(err.keyPattern).join(', ');
        err.statusCode = 400;
        err.message = `Duplicate field - ${error}`;
    }

    if(err.name === "CastError"){
      err.message = `Invalid format of ${err.path}`
      err.statusCode = 400
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

export { errorMiddleware }