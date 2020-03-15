'use strict'

const Web3 = require('web3')

class TwalaAuthenticator {
  constructor (provider, signatureVerifierContractAddress) {
    this.web3 = new Web3(provider)
    this.signatureVerifierContractAddress = signatureVerifierContractAddress
    this.signatureVerifierContractAbi = [{'inputs':[{'internalType':'address','name':'_address','type':'address'},{'internalType':'bytes32','name':'_messageHash','type':'bytes32'},{'internalType':'uint8','name':'_v','type':'uint8'},{'internalType':'bytes32','name':'_r','type':'bytes32'},{'internalType':'bytes32','name':'_s','type':'bytes32'}],'name':'isSigned','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'pure','type':'function'},{'inputs':[{'internalType':'bytes32','name':'_messageHash','type':'bytes32'},{'internalType':'uint8','name':'_v','type':'uint8'},{'internalType':'bytes32','name':'_r','type':'bytes32'},{'internalType':'bytes32','name':'_s','type':'bytes32'}],'name':'recoverAddress','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'pure','type':'function'}]
  }

  async recoverAddress (messageHash, v, r, s) {
    const signatureVerifierContractAbi = this.signatureVerifierContractAbi
    const signatureVerifierContractAddress = this.signatureVerifierContractAddress
    const signatureVerifierContract = new this.web3.eth.Contract(signatureVerifierContractAbi, signatureVerifierContractAddress)
    const address = await signatureVerifierContract.methods.recoverAddress(messageHash, v, r, s).call()

    return address
  }

  async isSigned (address, messageHash, v, r, s) {
    const signatureVerifierContractAbi = this.signatureVerifierContractAbi
    const signatureVerifierContractAddress = this.signatureVerifierContractAddress
    const signatureVerifierContract = new this.web3.eth.Contract(signatureVerifierContractAbi, signatureVerifierContractAddress)
    let isSigned = null
    try {
      isSigned = await signatureVerifierContract.methods.isSigned(address, messageHash, v, r, s).call()
    } catch (error) {
      isSigned = false
    }

    return isSigned
  }
}

module.exports = TwalaAuthenticator
