const UserModel = require("../models/user");
const AuthController = {
    login: (req, res)=>{
        res.render("admin/login", {data:{}});
    },
    postLogin: async (req, res)=>{
        const {email, password} = req.body;
        let error;
        const user = await UserModel.findOne({
            email,
            password,
        });
        console.log(user);
        if(user){
            req.session.email = email;
            req.session.password = password;
            return res.redirect("/admin/dashboard");
        }
        else{
            error = "Tài khoản không hợp lệ !";
            res.render("admin/login", {data:{error}});
        }
    },
    logout: (req, res)=>{
        req.session.destroy();
        res.redirect("/admin/login");
    }
}
module.exports = AuthController;