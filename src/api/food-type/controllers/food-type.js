"use strict";

/**
 * food-type controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::food-type.food-type",
  ({ strapi }) => ({
    async loadFoodType(ctx) {
      // let param = ctx.request.body;
      // console.log(param);
      let data = await strapi.db.query("api::food-type.food-type").findMany({
        where: {
          publishedAt: { $notNull: true },
          //   type: param.type,
          //   branch: { id: param.branch },
          // $or: [{ inactive_at: null }, { inactive_at: { $gt: _dateNow } }],
        },
        orderBy: { id: "ASC" },
      });
      return data;
    },
  })
);
