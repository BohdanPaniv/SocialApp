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

router.get("/file/:filename", async (req, res) => {
	try {
		const file = await gridFSBucket.files.findOne({ filename: req.params.filename });
		const readStream = gridFSBucket.createReadStream(file.filename);
		readStream.pipe(res);
	} catch (error) {
		res.json({ message: "not found"});
	}
});

// TODO will handler later
// router.delete("/file/:filename", async (req, res) => {
// 	try {
// 		await gridFSBucket.files.deleteOne({ filename: req.params.filename });
// 		res.send("success");
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ message: "An error occured"});
// 	}
// });

module.exports = router;