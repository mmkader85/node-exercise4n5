/**
 * Created by muhammed on 8/1/17.
 */

var dbconfig = {
  development: {
    host: 'localhost',
    port: 27017,
    database: 'leavethemarks'
  },
  production: {
    user: '',
    password: '',
    host: 'localhost',
    port: 27017,
    database: 'leavethemarks'
  }
}

module.exports = dbconfig;