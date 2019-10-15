import SparkMD5 from 'spark-md5'

export function getFileMd5(file: File, cb: Function) {
  let chunkSize = 1024 * 1024 * 2
  let chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  let spark = new SparkMD5.ArrayBuffer()
  let fileReader = new FileReader()

  fileReader.onload = function (ev) {
    spark.append(fileReader.result)
    currentChunk++

    if (currentChunk < chunks) {
      loadNext()
    } else {
      cb(spark.end())
    }
  }

  fileReader.onerror = function () { }

  function loadNext() {
    let start = currentChunk * chunkSize
    let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

    fileReader.readAsArrayBuffer(blobSlice(file, start, end))
  }

  loadNext()
}

 /**
 * 截取流
 * @param {blob} blob 流对象
 * @param {number} startByte 截取开始部分
 * @param {number} endByte 截取结束部分
 */
export function blobSlice(blob, startByte, endByte) {

  if (blob.slice) {
    return blob.slice(startByte, endByte)
  }
  // 兼容firefox
  if (blob.mozSlice) {
    return blob.mozSlice(startByte, endByte)
  }
  // 兼容webkit
  if (blob.webkitSlice) {
    return blob.webkitSlice(startByte, endByte)
  }
  return null
}
