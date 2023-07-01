"use strict";

/**
 * food-type router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/food-type/loadFoodType",
      handler: "food-type.loadFoodType",
    },
  ],
};
