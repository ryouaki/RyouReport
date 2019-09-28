const { BaseController } = require("ryou-router");
const path = require('path');
const fs = require('fs');

const config = require('./../config');

module.exports = class Log extends BaseController {
  before(req, res) {
    console.log("Request come in!" + req.originalUrl)
  }

  after(req, res) {
    console.log("Response come out!" + req.originalUrl)
  }

  'get /' () {
    this.success(null, null)
  }

  'post /' () {
    this.success(null, null)
  }
}
