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
    var isFull = isBook[0]?.amount > 10 ? false : true;
    if (!isBook[0]?.amount) {
      isFull = false;
    }
    console.log(isBook[0]?.amount, isFull);
    if (isBook.length) {
      let dataCreate = await strapi.db
        .query("api::book-date.book-date")
        .update({
          where: { date: dateStr },
          data: {
            amount: amount + isBook[0]?.amount,
            full: isBook[0]?.amount > 10 ? false : true,
          },
        });
      bookdateId = dataCreate?.id;
      // console.log(dataCreate);
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
      // console.log(dataCreate);
    }
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0";
    const nums = "123456789";
    const charactersLength = characters.length;
    const numsLength = characters.length;
    let counter = 0;
    let length = 2;
    let numL = 4;
    let counterL = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    while (counterL < numL) {
      result += nums.charAt(Math.floor(Math.random() * numsLength));
      counterL += 1;
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
        ref: result,
      },
    });
    // console.log(isFull, "isFull");
    const _dateNow = new Date();
    if (isFull) {
      let dataSp = await strapi.db
        .query("api::special-day.special-day")
        .create({
          data: {
            date: dateStr,
            Type: "Full",
            publishedAt: _dateNow,
            branch: { id: param.branch },
          },
        });
      // console.log(dataSp);
    }
    return data;
  },
  async getBook(ctx) {
    let param = ctx.request.body;
    let getBook = await strapi.db.query("api::booking.booking").findMany({
      where: { user: param.user },
      populate: {
        // @ts-ignore
        branch: true,
      },
    });
    return getBook;
  },
  async delBook(ctx) {
    let param = ctx.request.body;
    // console.log(param);
    let delBook = await strapi.db.query("api::booking.booking").delete({
      where: { id: param.id },
    });
    console.log(delBook?.amount);
    let data = await strapi.db.query("api::book-date.book-date").findMany({
      where: { id: delBook?.id },
    });
    let dataCreate = await strapi.db.query("api::book-date.book-date").update({
      where: { id: delBook?.id },
      data: {
        amount: data[0]?.amount - delBook[0]?.amount,
        full: delBook[0]?.amount < 10 ? false : true,
      },
    });
    return dataCreate;
  },
}));
