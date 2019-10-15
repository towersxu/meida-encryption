/**
 * 创建上传目录
 */
const signale = require('signale');

const path = require('path')
const fs = require('fs')

export default function () {
  try {
    fs.mkdirSync(path.resolve(__dirname, '../../uploads'))
    signale.success('创建uploads文件夹成功', 'server/init/MkUploadsDir.ts')
  } catch (e) {
    signale.debug('创建uploads文件夹失败', e.Error, 'server/init/MkUploadsDir.ts')
  }
}