const mongoose = require("../../common/database")();
const bannerSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        default: "https://vietpro.edu.vn",
    },
    target: {
        type: Boolean,
        default: false,
    },
    position: {
        type: Number,
        require: true,
    },
    publish: {
        type: Boolean,
        default: true,
    },
}, {timestamps: true});
const BannerModel = mongoose.model("Banners", bannerSchema, "banners");
module.exports = BannerModel;