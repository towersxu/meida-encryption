const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

module.exports = function (dir, filename = 'ae11.zip') {
  return new Promise((resolve, reject) => {
    let output = fs.createWriteStream(filename);
    let archive = archiver('zip');

    output.on('close', function () {
      console.log('文件压缩成功，大小为: ' + archive.pointer());
      resolve({
        size: archive
      })
    });
    archive.on('warning', function (err) {
      console.log('警告：文件压缩异常')
    });
    archive.on('error', function (err) {
      console.log('文件压缩错误！')
      throw err;
    });
    archive.pipe(output);
    archive.directory(dir, false);
    archive.finalize();
  })
  
}