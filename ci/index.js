#!/usr/bin/env node
let Client = require('ssh2').Client
let path = require('path')
let fs = require('fs')
let conn = new Client()

function ci () {
  conn.on('ready', function () {
    let buildPath = path.resolve(__dirname, '../build.zip');
    const remotePath = '/home/taox/project/audio-encryption/'
    conn.sftp(function (err, sftp) {
      if (err) {
        console.log(err)
        return
      }
      if (fs.existsSync(buildPath)) {
        fs.readFile(buildPath, function (err, data) {
          if (err) {
            console.log(err)
            conn.end()
            return
          }
          let command = `cd ${remotePath}; rm -rf ./.`;
          conn.exec(command, function (err, stream) {
            const filename = 'build.zip'
            console.log('开始上传文件:', filename)
            sftp.writeFile(remotePath + filename, data, function (err, res) {
              if (err) {
                console.log(err)
                conn.end()
                return
              }
              console.log('文件上传成功，开始解压')
              unzipFile(remotePath, filename)
            })
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
  let command = `cd ${path};  unzip -o -q ${fileName}; ./startup.sh > ./startup.log 2>&1;`
  conn.exec(command, function (err, stream) {
    if (err) {
      console.log(err)
    }
    stream.on('close', function (code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', function (data) {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', function (data) {
      console.log('STDERR: ' + data);
      conn.end();
    });
    console.log('解压成功')
    // conn.end()
  })
}
ci()
// module.exports = ci
