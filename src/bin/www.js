const app = require(`${__dirname}/../apps/app`);
const config = require("config");
// Server
const server = app.listen(port=config.get("app.serverPort"), (req, res)=>{

    console.log(`Server running on port ${port}`);
});