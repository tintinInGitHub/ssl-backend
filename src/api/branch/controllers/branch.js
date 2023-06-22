"use strict";

/**
 * branch controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::branch.branch", ({ strapi }) => ({
  async allBranch(ctx) {
    let data = await strapi.db.query("api::branch.branch").findMany({
      where: {
        publishedAt: { $notNull: true },
        // $or: [{ inactive_at: null }, { inactive_at: { $gt: _dateNow } }],
      },
      orderBy: { id: "ASC" },
    });
    return data;
  },
}));
