'use strict';

/**
 * promo-like service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::promo-like.promo-like');
