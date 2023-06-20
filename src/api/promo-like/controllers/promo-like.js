// @ts-nocheck
"use strict";

/**
 * promo-like controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::promo-like.promo-like",
  ({ strapi }) => ({
    async isLiked(ctx) {
      let param = ctx.request.body;
      console.log(param);
      var idPromo = parseInt(param.id);
      let data = await strapi.db.query("api::promo-like.promo-like").findOne({
        populate: { promo: true },
        where: {
          user: param.user,
          promo: { id: idPromo },
        },
      });
      console.log(data);
      let result = {};
      if (data && data.promo) result.liked = true;
      else result.liked = false;
      return result;
    },
    async liked(ctx) {
      console.log(ctx.request.body);
      let param = ctx.request.body;
      let data = await strapi.db.query("api::promo-like.promo-like").create({
        data: {
          user: param.user,
          promo: param.promo,
        },
      });
      return data;
    },
    async unliked(ctx) {
      let param = ctx.request.body;
      let data = await strapi.db.query("api::promo-like.promo-like").delete({
        where: {
          user: param.user,
          promo: { id: param.promo },
        },
      });
      return data;
    },
  })
);
