const express = require("express");
const databaseConn = require("./configs/databaseconn");
const errorHandling = require("./middleware/errorhandling");

const cors = require('cors');
const cookiesParser = require("cookie-parser");
 
const admin = require("./routes/AdminRoutes")
const manager = require("./routes/ManagerRoutes")
const employee = require("./routes/EmployeeRoutes")
const user = require("./routes/UserRoutes")
const group = require("./routes/GroupRoutes")
const timeline = require("./routes/TimelineRoutes")
const template = require("./routes/TemplateRoutes")
const project = require("./routes/ProjectRoutes")
const chat = require("./routes/ChatRoutes")
const meeting = require("./routes/MeetingRoutes")
const importantLink = require("./routes/ImpotantLinkRoutes")

const pendingtask = require("./routes/PendingTaskRoutes")
const notice = require("./routes/NoticeRoutes")

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

//api with /admin will go to admin routes
app.use("/admin", admin);
 
//api with /employee will go to employee  routes
app.use("/employee", employee );

//api with /manager will go to manager routes
app.use("/manager", manager);

//api with /group will go to group routes
app.use("/group", group);

//api with /timeline will go to timeline routes
app.use("/timelines", timeline);

//api with /pendingtask will go to pendingtask routes
app.use("/pendingtask", pendingtask);

//api with /template will go to template routes
app.use("/templates", template);

//api with /project will go to project routes
app.use("/projects", project);

//api with /chat will go to chat routes
app.use("/chat", chat);

//api with /meeting will go to chat routes
app.use("/meeting", meeting);

//api with /important links will go to chat routes
app.use("/link", importantLink);

//api with /notice links will go to chat routes
app.use("/notice", notice);

app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
