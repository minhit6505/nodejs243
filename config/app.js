module.exports = {
  serverPort: process.env.SERVER_PORT || 8000,
  router: `${__dirname}/../src/routers/web`,
  staticFolder: `${__dirname}/../src/public/`,
  viewsFolder: `${__dirname}/../src/apps/views`,
  baseImageUrl: `${__dirname}/../src/public/uploads/images/`,
  viewEngine: "ejs",
  tmpUpload: `${__dirname}/../src/tmp`,
  sessionKey: "vietpro_session",
  prefixApiVersion: process.env.PREFIX_API_VERSION || "/api/v1",
  jwtAccessKey: process.env.JWT_ACCESS_KEY || "vietproAccessKey",
  jwtRefreshKey: process.env.JWT_REFRESH_KEY ||  "vietproRefreshKey",
};
