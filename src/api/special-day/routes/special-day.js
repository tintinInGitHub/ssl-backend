"use strict";

/**
 * special-day router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/special-day",
      handler: "special-day.find",
    },
    {
      method: "POST",
      path: "/special-day/loadSpecialDay",
      handler: "special-day.loadSpecialDay",
    },
  ],
};
