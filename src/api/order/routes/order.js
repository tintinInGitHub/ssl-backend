"use strict";

/**
 * order router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    { method: "POST", path: "/order/addOrder", handler: "order.addOrder" },
  ],
};
