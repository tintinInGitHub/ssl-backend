"use strict";

/**
 * booking router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/booking",
      handler: "booking.find",
    },
    { method: "POST", path: "/booking/book", handler: "booking.book" },
  ],
};
