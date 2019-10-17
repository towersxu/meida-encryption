#!/usr/bin/env node
let Client = require('ssh2').Client
let path = require('path')
let fs = require('fs')
let conn = new Client()

function ci () {
  conn.on('ready', function () {
    let buildPath = path.resolve(__dirname, '../build.tar.gz')
    conn.sftp(function (err, sftp) {
      if (err) {
        console.log(err)
        return
      }
      if (fs.existsSync(buildPath)) {
        fs.readFile(buildPath, function (err, data) {
          if (err) {
            console.log(err)
          }
          const remotePath = '/home/taox/project/audio-encryption/'
          const filename = 'build.tar.gz'
          sftp.writeFile(remotePath + filename, data, function (err, res) {
            if (err) {
              console.log(err)
            }
            unzipFile(remotePath, filename)
          })
        })
      } else {
        console.log(buildPath)
        throw new Error('没有找到补丁')
      }
    })
  }).connect({
    host: process.env.host,
    port: process.env.port,
    username: process.env.username,
    password: process.env.password
  })
}

function unzipFile(path, fileName) {
  let command = `cd ${path}; rm -rf -R ./*; tar -xzvf ${fileName}; rm ${fileName}; chmod 777 -R ./*;`
  conn.exec(command, function (err, stream) {
    if (err) throw err
    stream.on('close', function (code, signal) {
      console.log('Stream 1:: close :: code: ' + code + ', signal: ' + signal)
      conn.end()
    }).on('data', function (data) {
      console.log(data + '')
    }).stderr.on('data', function (data) {
      console.log('STDERR1: ' + data)
    })
  })
}


ci()
// module.exports = ci
