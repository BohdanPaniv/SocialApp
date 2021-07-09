const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

let gridFSBucket;
const conn = mongoose.connection;

conn.once("open", function () {
	gridFSBucket = Grid(conn.db, mongoose.mongo);
	gridFSBucket.collection("photos");
});

router.get("/get/:filename", async (req, res) => {
	try {
		const file = await gridFSBucket.files.findOne({ filename: req.params.filename });
		const readStream = gridFSBucket.createReadStream(file.filename);
		readStream.pipe(res);
	} catch (error) {
		res.status(404).json({ message: "Not found"});
	}
});

router.delete("/delete/:filename", async (req, res) => {
	try {
		const foundImage = await gridFSBucket.files.findOne({ filename: req.params.filename });
		await gridFSBucket.remove({ _id: req.params.filename, root: "photos" });
		
		res.json({ message:"Old image deleted" });
	} catch (error) {
		console.log(error);
		res.json({ message: "An error occured"});
	}
});

module.exports = router;