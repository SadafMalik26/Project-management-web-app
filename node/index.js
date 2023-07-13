const express = require("express");
const databaseConn = require("./configs/databaseconn");
const errorHandling = require("./middleware/errorhandling");

const cors = require('cors');
const cookiesParser = require("cookie-parser");

const employee= require("./routes/EmployeeRoutes")
const admin = require("./routes/AdminRoutes")
const user = require("./routes/UserRoutes")
const pendingtask = require("./routes/PendingTaskRoutes")

require('dotenv').config()

//db connect mongoose
databaseConn();

const app = express();

var corsOptions = {
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
app.use(cookiesParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.Port || 5000;

//api with /user will go to user routes
app.use("/user", user);

//api with /Employee will go to Employee routes
app.use("/employee", employee);

//api with /admin will go to admin routes
app.use("/admin", admin);

//api with /pendingtask will go to pendingtask routes
app.use("/pendingtask", pendingtask);

app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
