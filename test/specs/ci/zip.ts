import { expect } from 'chai'
import zip from '../../../ci/zip'

const fs = require('fs')

describe('自动发布部署', () => {
  it('将文件夹压缩为zip文件', () => {
    zip('ci', 'build.zip')
    .then((res) => {
      fs.stat('./build.zip', function (err, stats) {
        expect(stats.isFile()).to.be.true
      })
    })
  });
})
