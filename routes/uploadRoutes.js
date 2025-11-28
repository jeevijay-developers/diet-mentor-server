const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");
const { uploadImage } = require("../controllers/uploadController");

router.post("/image", upload.single("file"), uploadImage);

module.exports = router;
