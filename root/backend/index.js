
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
	path: ".env.development"
});

const cookieParser = require("cookie-parser");
const dbConnection = require("./connection");

const authRoute = require("./routes/authentication/authentication");
const postsRouter = require("./routes/posts/posts");
const userRouter = require("./routes/users/users");
const filesRouter = require("./routes/files/files");
const imagesRouter = require("./routes/images/images");

const PORT = process.env.PORT || 5000;
const app = express();

if (process.env.NODE_ENV === "production") {
	app.use("/", express.static(path.join(__dirname, "frontend", "build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
}

dbConnection();

app.use(cookieParser());
app.use(express.json({ extended: true, limit: '50mb' }));
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRouter);
app.use("/api/users", userRouter);
app.use("/api/image", imagesRouter);
app.use("/api/file", filesRouter);

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`)
});