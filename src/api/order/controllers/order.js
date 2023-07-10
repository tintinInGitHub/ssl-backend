"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async addOrder(ctx) {
    let param = ctx.request.body;
    // console.log(param);
    let data = await strapi.db.query("api::order.order").create({
      data: {
        // publishedAt: { $notNull: true },
        //   type: param.type,
        status: "open",
        user: param.user,
        branch: { id: param.branch },
        foodOrder: param.foodOrder,
        // $or: [{ inactive_at: null }, { inactive_at: { $gt: _dateNow } }],
      },
    });
    return data;
  },
}));
