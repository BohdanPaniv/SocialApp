
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const dbConnection = require("./connection");

const authRoute = require("./routes/authentication/authentication");
const postsRouter = require("./routes/posts/posts");
const userRouter = require("./routes/users/users");
const filesRouter = require("./routes/files/files");
const imagesRouter = require("./routes/images/images");
const changePasswordRoute = require("./routes/changePassword/changePassword");

const PORT = process.env.PORT || 5000;
const app = express();

dbConnection();

app.use(cookieParser());
app.use(express.json({ extended: true, limit: '50mb' }));
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRouter);
app.use("/api/users", userRouter);
app.use("/", imagesRouter);
app.use("/api/file", filesRouter);

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`)
});