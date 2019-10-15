import { expect } from 'chai'
import { encryptionFile, decryptFile } from '../../server/utils/encryption'

describe('测试加密', () => {
  it('加密文字返回成功', () => {
    expect(encryptionFile()).to.be.true
    // expect(true).to.be.true
  });
  it('解密返回成功', () => {
    expect(decryptFile()).to.be.true
  })
})