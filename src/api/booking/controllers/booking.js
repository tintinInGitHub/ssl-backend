"use strict";

/**
 * booking controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::booking.booking", ({ strapi }) => ({
  async book(ctx) {
    console.log(ctx.request.body);
    let param = ctx.request.body;

    var parts = param.date.split("/");
    if (parts[0].toString().length < 2) {
      parts[0] = "0" + parts[0].toString();
    }
    if (parts[1].toString().length < 2) {
      parts[1] = "0" + parts[1].toString();
    }
    let dateStr =
      parts[2].toString() +
      "-" +
      parts[0].toString() +
      "-" +
      parts[1].toString();
    // console.log(
    //   parts,
    //   param.date,
    //   dateStr,
    //   parts[1].toString().length,
    //   parts[0].toString().length
    // );
    var amount = parseInt(param.amount);
    let isBook = await strapi.db.query("api::book-date.book-date").findMany({
      where: { date: dateStr },
    });
    console.log(isBook);
    var bookdateId = "";
    var isFull = isBook[0]?.amount < 10 ? false : true;
    // console.log(isBook[0].amount);
    if (isBook.length) {
      let dataCreate = await strapi.db
        .query("api::book-date.book-date")
        .update({
          where: { date: dateStr },
          data: {
            amount: amount + isBook[0]?.amount,
            full: isBook[0]?.amount < 10 ? false : true,
          },
        });
      bookdateId = dataCreate?.id;
      console.log(dataCreate);
    } else {
      let dataCreate = await strapi.db
        .query("api::book-date.book-date")
        .create({
          data: {
            date: dateStr,
            amount: amount,
            full: false,
            branch: { id: param.branch },
          },
        });
      bookdateId = dataCreate?.id;
      console.log(dataCreate);
    }
    let data = await strapi.db.query("api::booking.booking").create({
      data: {
        user: param.user,
        mobile: param.mobile,
        name: param.name,
        amount: amount,
        status: "open",
        branch: { id: param.branch },
        book_dates: { id: bookdateId },
      },
    });
    console.log(isFull, "isFull");
    const _dateNow = new Date();
    if (isFull) {
      let dataSp = await strapi.db
        .query("api::special-day.special-day")
        .create({
          data: { date: dateStr, Type: "Full", publishedAt: _dateNow },
        });
      console.log(dataSp);
    }

    return data;
  },
}));
