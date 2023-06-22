"use strict";

/**
 * special-day controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::special-day.special-day",
  ({ strapi }) => ({
    async loadSpecialDay(ctx) {
      let param = ctx.request.body;
      let data = await strapi.db
        .query("api::special-day.special-day")
        .findMany({
          where: {
            publishedAt: { $notNull: true },
            type: param.type,
            // $or: [{ inactive_at: null }, { inactive_at: { $gt: _dateNow } }],
          },
          orderBy: { id: "ASC" },
        });
      return data;
    },
  })
);
