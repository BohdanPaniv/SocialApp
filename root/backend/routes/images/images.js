const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const conn = mongoose.connection;
var bucket;

conn.once("open", function () {
	bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "photos"
  });
});

router.get("/get/:filename", async (req, res) => {
	try {
		const downStream = bucket.openDownloadStreamByName(req.params.filename);
		downStream.pipe(res);
	} catch (error) {
		res.status(404).json({ message: "Not found"});
	}
});

router.delete("/delete/:filename", async (req, res) => {
	try {
		const document = await bucket.find({ filename: req.params.filename}).toArray();
		
		if (document.length === 0) {
			return res.status(400).json({ message: "Image not found" });
		}

		await bucket.delete(document[0]._id);
		res.json({ message:"Old image deleted" });
	} catch (error) {
		console.log(error);
		res.json({ message: "An error occured"});
	}
});

module.exports = router;