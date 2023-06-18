"use strict";

/**
 * promo controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::promo.promo", ({ strapi }) => ({
  async allPromo(ctx) {
    // @ts-ignore
    let data = await strapi.db
      .query("api::promo.promo")
      .findMany({ populate: { banner: true, video_banner: true } });
    return data;
  },
}));
