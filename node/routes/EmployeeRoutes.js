const express = require("express");
var multer = require('multer');
 
const { count,list,add,qualification} = require("../controllers/EmployeeController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

router.post("/", upload.single('selectedImage'),add);

router.get("/count", count);

router.get("/qualification/:id", qualification);

router.get("/", list);




module.exports = router;
