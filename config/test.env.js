'use strict'

const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  HOST: '"http://chibarro.manaus.am.gov.br/trsd-back/public/"'
})
