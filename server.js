console.log("Welcome!!!!");

import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import isValidUser from "./middlewares/validate.js";

import router from "./routes/routes.js";
import {} from "dotenv/config";

// const uri =
//     "mongodb+srv://foramchhaya95:ebJnNbx3WoKsKGq3@cluster0.pmnjtxa.mongodb.net/costcoUsers?retryWrites=true&w=majority";

const uri = process.env.MONGO_URI;

const session_store = MongoStore.create({
    mongoUrl: uri,
    dbName: "costcoUsers",
    collectionName: "costcoSessions",
});

const app = express();

app.use(
    session({
        secret: "A secret key to sign the cookie",
        saveUninitialized: false,
        resave: false,
        store: session_store,
    })
);
app.set("view-engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port} *******`);
});

// app.get("/home", (req, res) => {
//     res.render("home.ejs");
// });

// app.get("/login", (req, res) => {
//     req.session.isValid = true;
//     res.render("login.ejs");
//     console.log(req.session.id);
// });

// Adding middleware to Dashboard route
// to restrict the user from accessing the dashboard page
// only the logged in users having session will be visiting
// the dashboard page

// app.get("/dashboard", isValidUser, (req, res) => {
//     res.render("dashboard.ejs");
// });

// app.post("/logout", (req, res) => {
//     req.session.destroy((err) => {
//         if (err) throw err;
//         res.redirect("/home");
//     });
// });

app.use("/", router);

// app.get("/test", (req, res) => {
//     req.session.user = "john";
//     req.session.age = 20;
//     delete req.session.age;
//     console.log(req.session);
//     res.render("test.ejs");
// });

// export default
