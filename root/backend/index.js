const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

const cookieParser = require("cookie-parser");
const connection = require("./connection");
const Grid = require("gridfs-stream");

const authRoute = require("./routes/authentication");
const postsRouter = require("./routes/posts");
const feedRouter = require("./routes/feed");
const filesRouter = require("./routes/files");
const changePasswordRoute = require("./routes/changePassword");

const mongoose = require("mongoose");
const app = express();

app.use(cookieParser());
app.use(express.json({extended: true, limit: '50mb'}));
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRouter);
app.use("/api/feed", feedRouter);

let gridFSBucket;
connection();
	
const conn = mongoose.connection;
conn.once("open", function () {
	gridFSBucket = Grid(conn.db, mongoose.mongo);
	gridFSBucket.collection("photos");
});

app.use("/api/file", filesRouter);

app.get(
  "/file/:filename", 
	async (req, res) => {
	try {
		const file = await gridFSBucket.files.findOne({ filename: req.params.filename });
		const readStream = gridFSBucket.createReadStream(file.filename);
		readStream.pipe(res);
	} catch (error) {
		res.json({ message: "not found"});
	}
});

app.delete(
  "/:filename", 
	async (req, res) => {
	try {
		await gridFSBucket.files.deleteOne({ filename: req.params.filename });
		res.send("success");
	} catch (error) {
		console.log(error);
		res.json({ message: "An error occured"});
	}
});

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`)
});