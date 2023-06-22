"use strict";

/**
 * branch router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/branch",
      handler: "branch.find",
    },
    { method: "POST", path: "/branch/allBranch", handler: "branch.allBranch" },
  ],
};
