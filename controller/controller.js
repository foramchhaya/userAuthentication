import session from "express-session";

import userModel from "../model/userModel.js";

import bcrypt from "bcrypt";

class Controller {
    static login_get = (req, res) => {
        const msg = req.session.msg;
        const mymsg = msg;
        delete req.session.msg;
        res.render("login.ejs", { mymsg });
    };

    static dashboard_get = (req, res) => {
        const mymsg = req.session.msg;
        delete req.session.msg;
        res.render("dashboard.ejs", { mymsg });
    };

    static logout_post = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                throw err;
            } else {
                res.redirect("/");
            }
        });
    };

    static home_get = (req, res) => {
        res.render("home.ejs");
    };

    static signup_get = (req, res) => {
        const mymsg = req.session.msg;
        delete req.session.msg;
        res.render("signup.ejs", { mymsg });
    };

    static signup_post = async (req, res) => {
        try {
            const form_data = req.body;
            let user = await userModel.findOne({ email: form_data.email });
            if (user) {
                req.session.msg = `${user.name} is an existing user. please login!`;
                res.redirect("/login");
            }
            const hashedPwd = await bcrypt.hash(form_data.pwd, 10);

            if (!user) {
                user = new userModel({
                    name: form_data.uname,
                    email: form_data.email,
                    pwd: hashedPwd,
                });
                const user_saved = user.save();
                console.log(user_saved);
                req.session.msg = `Signup successfull Please Login in!`;
                res.redirect("/login");
            }
        } catch (err) {}
    };

    static login_post = async (req, res) => {
        try {
            const form_data = req.body;
            let exisintg_user = await userModel.findOne({
                email: form_data.email,
            });
            console.log("exisintg_user", exisintg_user);
            if (!exisintg_user) {
                req.session.msg = `Not an existing user, please signup`;
                return res.redirect("/signup");
            }
            const user_matched = await bcrypt.compare(
                form_data.pwd,
                exisintg_user.pwd
            );
            console.log("user_matched", user_matched);
            if (user_matched) {
                req.session.isValid = true;
                req.session.msg = `welcome ${exisintg_user.name}`;
                res.redirect("/dashboard");
            } else {
                req.session.msg = `incorrect password`;
                return res.redirect("/login");
            }
            // res.send(user_matched);
        } catch (err) {
            console.log(err);
        }
    };
}

export default Controller;
