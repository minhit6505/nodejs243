const {createClient} = require("redis");
const client = createClient({
    url: "redis://default:gXJrHvC0sAQo4OwQdjTDjZGdGHzsbQqW@redis-11139.c74.us-east-1-4.ec2.redns.redis-cloud.com:11139"
});
client.on("error", (error)=>console.log("Redis client error", error));
const connectionRedis = ()=>{
    return client.connect()
        .then(()=>console.log("Redis connected"))
        .catch((error)=>console.log(error));
}
module.exports = {
    connectionRedis,
    redisClient: client,
}
