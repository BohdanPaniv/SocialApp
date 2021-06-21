const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(express.json());

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`)
        });
    } catch (error) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

main();