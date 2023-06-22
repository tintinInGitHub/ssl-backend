"use strict";

/**
 * booking controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::booking.booking", ({ strapi }) => ({
  async book(ctx) {
    console.log(ctx.request.body);
    let param = ctx.request.body;
    var amount = parseInt(param.amount);
    let data = await strapi.db.query("api::booking.booking").create({
      data: {
        user: param.user,
        mobile: param.mobile,
        name: param.name,
        amount: amount,
        status: "open",
        branch: { id: param.branch },
      },
    });
    return data;
  },
}));
