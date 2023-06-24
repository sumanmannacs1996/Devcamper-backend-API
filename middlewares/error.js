const erorHandler = (error, req, res, next) => {
    if (error.name == "CastError") {
        error.message = "Invalid _id provided"
        res.statusCode = 404
    }
    else if (["ValidationError", "MongoServerError"].includes(error.name)) {
        res.statusCode = 400
    }
    res.status(res.statusCode || 500).json({
        message: error.message || "Server error",
        ...(process.env.NODE_ENV === 'development') && { stack: error.stack }
    })
}

module.exports = erorHandler