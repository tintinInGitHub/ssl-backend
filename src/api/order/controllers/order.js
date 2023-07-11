// @ts-nocheck
"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async addOrder(ctx) {
    let param = ctx.request.body;
    // console.log(param);
    let data = await strapi.entityService.create("api::order.order", {
      data: {
        status: "open",
        user: param.user,
        branch: { id: param.branch },
        listOrder: param.listOrder,
      },
    });
    return data;
  },
  async findOrder(ctx) {
    let param = ctx.request.body;
    // console.log(param);
    let data = await strapi.db.query("api::order.order").findMany({
      populate: {
        listOrder: { populate: true },
      },
    });
    return data;
  },
}));
