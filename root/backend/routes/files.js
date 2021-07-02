const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();
const connection = require("./../connection");

router.post(
  "/upload",
  upload.single("file"), 
  async (req, res) => {

    if (!req.file) {
      return res.status(400).json({ message: "you must select a file."});
    }

    return res.json({ filename: req.file.filename});
});

module.exports = router;