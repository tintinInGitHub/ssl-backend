"use strict";

/**
 * promo-like router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/promo-like",
      handler: "promo-like.find",
    },
    { method: "POST", path: "/isLiked", handler: "promo-like.isLiked" },
    { method: "POST", path: "/liked", handler: "promo-like.liked" },
    { method: "POST", path: "/unliked", handler: "promo-like.unliked" },
  ],
};
