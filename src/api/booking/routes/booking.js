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
    { method: "POST", path: "/booking/getBook", handler: "booking.getBook" },
    { method: "POST", path: "/booking/delBook", handler: "booking.delBook" },
  ],
};
