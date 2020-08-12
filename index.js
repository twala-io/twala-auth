'use strict'

const Web3 = require('web3')

class TwalaAuthenticator {
  constructor (provider) {
    this.web3 = new Web3(provider)
    this.claimHolderContractAbi = [{'constant':true,'inputs':[{'name':'_key','type':'bytes32'}],'name':'getKeyPurpose','outputs':[{'name':'purpose','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'_key','type':'bytes32'}],'name':'getKey','outputs':[{'name':'purpose','type':'uint256'},{'name':'keyType','type':'uint256'},{'name':'key','type':'bytes32'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_key','type':'bytes32'},{'name':'_purpose','type':'uint256'},{'name':'_type','type':'uint256'}],'name':'addKey','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'_claimId','type':'bytes32'}],'name':'removeClaim','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'_id','type':'uint256'},{'name':'_approve','type':'bool'}],'name':'approve','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[{'name':'_topic','type':'uint256'}],'name':'getClaimIdsByTopic','outputs':[{'name':'claimIds','type':'bytes32[]'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_key','type':'bytes32'}],'name':'removeKey','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[{'name':'_purpose','type':'uint256'}],'name':'getKeysByPurpose','outputs':[{'name':'_keys','type':'bytes32[]'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_topic','type':'uint256'},{'name':'_scheme','type':'uint256'},{'name':'_issuer','type':'address'},{'name':'_signature','type':'bytes'},{'name':'_data','type':'bytes'},{'name':'_uri','type':'string'}],'name':'addClaim','outputs':[{'name':'claimRequestId','type':'bytes32'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'_to','type':'address'},{'name':'_value','type':'uint256'},{'name':'_data','type':'bytes'}],'name':'execute','outputs':[{'name':'executionId','type':'uint256'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[{'name':'_claimId','type':'bytes32'}],'name':'getClaim','outputs':[{'name':'topic','type':'uint256'},{'name':'scheme','type':'uint256'},{'name':'issuer','type':'address'},{'name':'signature','type':'bytes'},{'name':'data','type':'bytes'},{'name':'uri','type':'string'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'_key','type':'bytes32'},{'name':'_purpose','type':'uint256'}],'name':'keyHasPurpose','outputs':[{'name':'result','type':'bool'}],'payable':false,'stateMutability':'view','type':'function'},{'anonymous':false,'inputs':[{'indexed':true,'name':'claimRequestId','type':'uint256'},{'indexed':true,'name':'topic','type':'uint256'},{'indexed':false,'name':'scheme','type':'uint256'},{'indexed':true,'name':'issuer','type':'address'},{'indexed':false,'name':'signature','type':'bytes'},{'indexed':false,'name':'data','type':'bytes'},{'indexed':false,'name':'uri','type':'string'}],'name':'ClaimRequested','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'claimId','type':'bytes32'},{'indexed':true,'name':'topic','type':'uint256'},{'indexed':true,'name':'issuer','type':'address'},{'indexed':false,'name':'signatureType','type':'uint256'},{'indexed':false,'name':'signature','type':'bytes32'},{'indexed':false,'name':'claim','type':'bytes'},{'indexed':false,'name':'uri','type':'string'}],'name':'ClaimAdded','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'claimId','type':'bytes32'},{'indexed':true,'name':'topic','type':'uint256'},{'indexed':false,'name':'scheme','type':'uint256'},{'indexed':true,'name':'issuer','type':'address'},{'indexed':false,'name':'signature','type':'bytes'},{'indexed':false,'name':'data','type':'bytes'},{'indexed':false,'name':'uri','type':'string'}],'name':'ClaimAdded','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'claimId','type':'bytes32'},{'indexed':true,'name':'topic','type':'uint256'},{'indexed':false,'name':'scheme','type':'uint256'},{'indexed':true,'name':'issuer','type':'address'},{'indexed':false,'name':'signature','type':'bytes'},{'indexed':false,'name':'data','type':'bytes'},{'indexed':false,'name':'uri','type':'string'}],'name':'ClaimRemoved','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'claimId','type':'bytes32'},{'indexed':true,'name':'topic','type':'uint256'},{'indexed':false,'name':'scheme','type':'uint256'},{'indexed':true,'name':'issuer','type':'address'},{'indexed':false,'name':'signature','type':'bytes'},{'indexed':false,'name':'data','type':'bytes'},{'indexed':false,'name':'uri','type':'string'}],'name':'ClaimChanged','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'executionId','type':'uint256'},{'indexed':true,'name':'to','type':'address'},{'indexed':true,'name':'value','type':'uint256'},{'indexed':false,'name':'data','type':'bytes'}],'name':'ExecutionFailed','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'key','type':'bytes32'},{'indexed':true,'name':'purpose','type':'uint256'},{'indexed':true,'name':'keyType','type':'uint256'}],'name':'KeyAdded','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'key','type':'bytes32'},{'indexed':true,'name':'purpose','type':'uint256'},{'indexed':true,'name':'keyType','type':'uint256'}],'name':'KeyRemoved','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'executionId','type':'uint256'},{'indexed':true,'name':'to','type':'address'},{'indexed':true,'name':'value','type':'uint256'},{'indexed':false,'name':'data','type':'bytes'}],'name':'ExecutionRequested','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'executionId','type':'uint256'},{'indexed':true,'name':'to','type':'address'},{'indexed':true,'name':'value','type':'uint256'},{'indexed':false,'name':'data','type':'bytes'}],'name':'Executed','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'executionId','type':'uint256'},{'indexed':false,'name':'approved','type':'bool'}],'name':'Approved','type':'event'}]
  }

  async authenticate (message, messageHash, v, r, s ) {
    const hashedMessage = this.web3.eth.accounts.hashMessage(message)
    if (hashedMessage !== messageHash) {
      return {
        identity: null,
        is_authenticated: false
      }
    }
    const parsedMessage = JSON.parse(this.web3.utils.hexToAscii(message))
    const deviceClaimTopic = 1
    const claimHolderContractAbi = this.claimHolderContractAbi
    const identityContractAddress = parsedMessage.identity_contract_address
    const identityContract = new this.web3.eth.Contract(claimHolderContractAbi, identityContractAddress)
    const deviceClaims = await identityContract.methods.getClaimIdsByTopic(deviceClaimTopic).call()
    const deviceClaim = await identityContract.methods.getClaim(deviceClaims[deviceClaims.length - 1]).call()
    const deviceClaimData = this.web3.utils.hexToAscii(deviceClaim[4])
    const device = JSON.parse(deviceClaimData)
    const deviceAddress = device.address
    const recoverAddress = this.web3.eth.accounts.recover({ messageHash, v, r, s })
    if (deviceAddress === recoverAddress) {
      return {
        identity: {
          identity_contract_address: identityContractAddress,
          account_claim: {
            email: parsedMessage.email,
            mobile: parsedMessage.mobile
          },
          identification_claim: {
            id_type: parsedMessage.id_type,
            id_number: parsedMessage.id_number,
            id_expiration: parsedMessage.id_expiration,
            first_name: parsedMessage.first_name,
            middle_name: parsedMessage.middle_name,
            last_name: parsedMessage.last_name,
            suffix: parsedMessage.suffix,
            sex: parsedMessage.sex,
            date_of_birth: parsedMessage.date_of_birth
          }
        },
        location: {
          latitude: parsedMessage.latitude,
          longitude: parsedMessage.longitude
        },
        is_authenticated: true
      }
    } else {
      return {
        identity: null,
        is_authenticated: false
      }
    }
  }
}

module.exports = TwalaAuthenticator
