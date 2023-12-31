"use strict";

/**
 * promo router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/promo",
      handler: "promo.find",
    },
    { method: "POST", path: "/promo/allPromo", handler: "promo.allPromo" },
  ],
};
