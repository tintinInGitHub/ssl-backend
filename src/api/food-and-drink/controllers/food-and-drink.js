// @ts-nocheck
"use strict";

/**
 * food-and-drink controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::food-and-drink.food-and-drink",
  ({ strapi }) => ({
    async loadFood(ctx) {
      let param = ctx.request.body;
      console.log(param);
      let parseId = parseInt(param.food_type);
      if (param.keyword) {
        let data = await strapi.db
          .query("api::food-and-drink.food-and-drink")
          .findMany({
            where: {
              publishedAt: { $notNull: true },
              food_types: { id: parseId },
              name: {
                $containsi: param.keyword,
              },
              //   type: param.type,
              //   branch: { id: param.branch },
              // $or: [{ inactive_at: null }, { inactive_at: { $gt: _dateNow } }],
            },
            populate: { food_types: true },
            orderBy: { id: "ASC" },
          });
        return data;
      }
      let data = await strapi.db
        .query("api::food-and-drink.food-and-drink")
        .findMany({
          where: {
            publishedAt: { $notNull: true },
            food_types: { id: parseId },

            //   type: param.type,
            //   branch: { id: param.branch },
            // $or: [{ inactive_at: null }, { inactive_at: { $gt: _dateNow } }],
          },
          populate: { food_types: true },
          orderBy: { id: "ASC" },
        });
      return data;
    },
  })
);
