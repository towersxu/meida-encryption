let Client = require('ssh2').Client
let path = require('path')
let fs = require('fs')
let conn = new Client()

module.exports = function () {
  conn.on('ready', function () {
    conn.sftp(function (err, sftp) {
      
    })
  }).connect({
    host: process.env.host,
    port: process.env.port,
    username: process.env.username,
    password: process.env.password
  })
}

function zipDir (path) {
  
}
