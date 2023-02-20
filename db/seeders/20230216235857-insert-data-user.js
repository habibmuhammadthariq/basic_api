'use strict';

const { getHash } = require('../../app/helpers/auth');
require('dotenv').config()
const { ADMIN_NAME, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: ADMIN_NAME,
      username: ADMIN_USERNAME,
      password: getHash(ADMIN_PASSWORD),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
