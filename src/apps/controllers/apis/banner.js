const BannerModel = require("../../models/banner");
module.exports = {
    index: async (req, res)=>{
        try {
            let query = {};
            if(req.query.publish){
                query.publish = req.query.publish;
            }
            const limit = Number(req.query.limit) || 5;
            const sort = Number(req.query.sort) || 1;
            const banners = await BannerModel.find(query)
                .sort({_id: sort})
                .limit(limit);
            return res.status(200).json({
                status: "success",
                filters:{
                    sort,
                    limit,
                    publish: query.publish || null
                },
                data: {
                    docs: banners,
                }
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
}