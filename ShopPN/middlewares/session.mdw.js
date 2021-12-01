//login
const session = require("express-session");
module.exports = function (app) {
  //login
  app.set("trust proxy", 1); //trust first proxy
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 180 * 60 * 1000 //set thời gian
      },
    })
  );
};
