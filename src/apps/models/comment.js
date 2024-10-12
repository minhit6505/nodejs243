const mongoose = require("../../common/database")();
const commentScheme = new mongoose.Schema({
    prd_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
}, {timestamps: true});
const CommentModel = mongoose.model("Comments", commentScheme, "comments");
module.exports = CommentModel;