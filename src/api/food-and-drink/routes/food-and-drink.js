"use strict";

/**
 * food-type router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/food-and-drink/loadFood",
      handler: "food-and-drink.loadFood",
    },
  ],
};
