const CustomerModel = require("../../models/customer");
const TokenModel = require("../../models/token");
const {redisClient} = require("../../../common/init.redis");
const {jwtDecode} = require("jwt-decode");
const jwt = require("jsonwebtoken");
const config = require("config");
const generateAccessToken = async (customer)=>{
    return jwt.sign(
        {_id: customer._id},
        config.get("app.jwtAccessKey"),
        {expiresIn: "1d"}
    );
}
const generateRefreshToken = async (customer)=>{
    return jwt.sign(
        {_id: customer._id},
        config.get("app.jwtRefreshKey"),
        {expiresIn: "1y"}
    );
}

const setTokenBlacklist = (token)=>{
    const decoded = jwtDecode(token);
    if(decoded.exp > new Date()/1000){
        redisClient.set(token, token, {
            EXAT: decoded.exp,
        });
    }
}
module.exports = {
    registerCustomer: async (req, res)=>{
        try {
            const {body} = req;
            
            const isEmail = await CustomerModel.findOne({
                email: body.email,
            });
            if(isEmail) return res.status(401).json("Email exists");
            const isPhone = await CustomerModel.findOne({
                phone: body.phone,
            });
            if(isPhone) return res.status(401).json("Phone exists");
            if(!isEmail && !isPhone){
                await new CustomerModel(body).save();
                return res.status(201).json("Create customer successfully");
            }

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    loggedInCustomer: async (req, res)=>{
        try {
            const {body} = req;
            const isEmail = await CustomerModel.findOne({
                email: body.email,
            });
            if(!isEmail) return res.status(400).json("Email not valid");
            const isPassword = isEmail.password===body.password;
            if(!isPassword) return res.status(400).json("Password not valid");
            if(isEmail && isPassword){
                const accessToken = await generateAccessToken(isEmail);
                const refreshToken = await generateRefreshToken(isEmail);

                const isToken = await TokenModel.findOne({
                    customerId: isEmail._id,
                });
                if(isToken){
                    setTokenBlacklist(isToken.accessToken);
                    await TokenModel.deleteOne({
                        customerId: isEmail._id,
                    });
                }

                // Insert token to DB 
                await new TokenModel({
                    customerId: isEmail._id,
                    accessToken,
                    refreshToken,
                }).save();

                const {password, ...others} = isEmail._doc;
                res.cookie("refreshToken", refreshToken);
                return res.status(200).json({
                    customer: others,
                    accessToken,
                });
                
            }

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    loggedOutCustomer: async (req, res)=>{
        try {
            const {id} = req.params;
            const isToken = await TokenModel.findOne({
                customerId: id,
            });
            // Move accesstoken to Redis
            setTokenBlacklist(isToken.accessToken);

            // Delete token from DB
            await TokenModel.deleteOne({
                customerId: id,
            });

            return res.status(200).json("Logged out successfully");

        } catch (error) {
            return res.status(500).json(error)
        }
    },
    requestRefreshToken: async (req, res)=>{
        try {
            const {refreshToken} = req.cookies;
            if(!refreshToken){
                return res.status(401).json("Authentication required");
            }
            else{
                jwt.verify(
                    refreshToken,
                    config.get("app.jwtRefreshKey"),
                    async (err, decoded)=>{
                        if(err) return res.status(401).json("Authentication required");
                        const newAccessToken = await generateAccessToken(decoded);
                        return res.status(200).json({
                            accessToken: newAccessToken,
                        });
                    }
                );
            }          
        } catch (error) {
            return res.status(500).json(error)
        }
    },
}