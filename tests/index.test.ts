
import { expect } from 'chai'
import getString from '../lib'

describe('get Mode string', () => {
  it('should return right mode string', () => {
    expect(getString()).to.equal('disabled')
    expect(getString(false)).to.equal('disabled')
    expect(getString(true)).to.equal('active')
  })
})
