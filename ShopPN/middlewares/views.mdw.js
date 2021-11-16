const exphbs = require("express-handlebars");
//ko gian
const express_handlebars_sections = require("express-handlebars-sections");
const numeral = require("numeral");
module.exports = function (app) {
  app.engine(
    "hbs",
    exphbs({
      layoutsDir: "views/_layouts",
      defaultLayout: "main",
      partialsDir: "views/_partials",
      extname: ".hbs",

      //price
      helpers: {
        section: express_handlebars_sections(),
        format_number: function (value) {
          return numeral(value).format("0,0");
        },
       
      },
    })
  );
  app.set("view engine", "hbs");
};
