const { Router } = require('express');
const express = require('express');

const dashboard = express.Router();

dashboard.get('/',(req,res) => {
    res.send('Database')
  });

  module.exports = dashboard