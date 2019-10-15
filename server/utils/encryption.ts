var CryptoJS = require('crypto-js');
var AES = require("crypto-js/aes");
var fs = require("fs");
var path = require('path');

export function encryptionFile () {
  var e = AES.encrypt('zxzzzz', 'skx');
  console.log(e.toString())
  return true
}

export function decryptFile () {
  var str = 'U2FsdGVkX18yOtNbnjkZ60d5PAObUPpdmHcpVKRXqlg=';
  var r = AES.decrypt(str, 'skx');
  console.log(r.toString(CryptoJS.enc.Utf8))
  return true
}

// let seed = [
//   [0x4a, 0xd6, 0xca, 0x90, 0x67, 0xf7, 0x52], 
//   [0x5e, 0x95, 0x23, 0x9f, 0x13, 0x11, 0x7e],
//   [0x47, 0x74, 0x3d, 0x90, 0xaa, 0x3f, 0x51],
//   [0xc6, 0x09, 0xd5, 0x9f, 0xfa, 0x66, 0xf9],
//   [0xf3, 0xd6, 0xa1, 0x90, 0xa0, 0xf7, 0xf0],
//   [0x1d, 0x95, 0xde, 0x9f, 0x84, 0x11, 0xf4],
//   [0x0e, 0x74, 0xbb, 0x90, 0xbc, 0x3f, 0x92],
//   [0x00, 0x09, 0x5b, 0x9f, 0x62, 0x66, 0xa1]
// ]

export function encryptFile () {
  fs.readFile(path.resolve(__dirname, './demo2.mp3'), function (err, buffer) {
    console.log(buffer)
    let arr = new Uint8Array(buffer);
    // let str: string[] = [];

    for (let i = 0; i < arr.length; i++) {
      // console.log(arr[i])
      // str.push(String.fromCharCode(arr[i]));
      arr[i] = arr[i] ^ 0x11;
    }
    fs.writeFile(path.resolve(__dirname, './demo3.mp3'), arr, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log(3);
      }
    })
    // console.log(arr)
  })
  
}
encryptFile()