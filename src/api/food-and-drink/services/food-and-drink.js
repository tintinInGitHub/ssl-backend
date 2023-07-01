'use strict';

/**
 * food-and-drink service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::food-and-drink.food-and-drink');
