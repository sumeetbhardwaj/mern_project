const mongoDB = require('mongoose');
exports.mongodb = async () => {
    mongoDB.connect(process.env.HOST_URI)
          .then(() => { console.log("connection okay") }).catch((error) => {
            console.error("MongoDB connection error:", error);
            // Optionally, you might want to throw the error to indicate that the connection failed
            throw error;
        })
}