"use strict";

var exphbs = require("express-handlebars"); //ko gian


var express_handlebars_sections = require("express-handlebars-sections");

var numeral = require("numeral");

module.exports = function (app) {
  app.engine("hbs", exphbs({
    layoutsDir: "views/_layouts",
    defaultLayout: "main",
    partialsDir: "views/_partials",
    extname: ".hbs",
    //price
    helpers: {
      section: express_handlebars_sections(),
      format_number: function format_number(value) {
        return numeral(value).format("0,0");
      }
    }
  }));
  app.set("view engine", "hbs");
};