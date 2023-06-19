// @ts-nocheck
"use strict";

/**
 * promo controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::promo.promo", ({ strapi }) => ({
  async allPromo(ctx) {
    let _dateNow = new Date();
    let data = await strapi.db.query("api::promo.promo").findMany({
      where: {
        publishedAt: { $notNull: true },
        $or: [{ inactive_at: null }, { inactive_at: { $gt: _dateNow } }],
      },
      populate: { banner: true, video_banner: true },
    });
    return data;
  },
}));
