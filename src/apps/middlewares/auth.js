module.exports = {

    checkAdmin: (req, res, next)=>{
        // if(!req.session.email || !req.session.password) return res.redirect("/admin/login");
        next();
    },
    checkLogin: (req, res, next)=>{
        // if(req.session.email && req.session.password) return res.redirect("/admin/dashboard");
        next();
    }
}