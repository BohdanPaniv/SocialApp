const mongoose = require("mongoose");

async function connection() {
	try {
    const connectionParams = {
      useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
    };

		await mongoose.connect(process.env.MONGO_URL, connectionParams);
	} catch (error) {
		console.log("Server Error", error.message);
		process.exit(1);
	}
}

module.exports = connection;