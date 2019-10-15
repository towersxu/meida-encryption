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
