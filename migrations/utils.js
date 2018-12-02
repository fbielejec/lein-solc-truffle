const fs = require('fs');

const utils = {

  last: (array) => {
    return array[array.length - 1];
  },

  copy: (srcName, dstName, contracts_build_directory, network, address) => {

    let buildPath = __dirname + '/../build/contracts/'
    if (contracts_build_directory) {
      buildPath = contracts_build_directory;
    } 
        
    const srcPath = buildPath + srcName + '.json';
    const dstPath = buildPath + dstName + '.json';
    const data = require(srcPath);
    data.contractName = dstName;

    // Save address when given
    if (network && address) {
      data.networks = {};

      // Copy existing networks
      if (fs.existsSync(dstPath)) {
        const existing = require(dstPath);
        data.networks = existing.networks;
      }

      data.networks[network.toString()] = {
        //events: {},
        //links: {},
        address: address
        //transactionHash: ''
      };
    }
    fs.writeFileSync(dstPath, JSON.stringify(data, null, 2), { flag: 'w' });
  },

  linkBytecode: (contract, placeholder, replacement) => {
    var placeholder = placeholder.replace('0x', '');
    var replacement = replacement.replace('0x', '');
    var bytecode = contract.bytecode.split(placeholder).join(replacement);
    contract.bytecode = bytecode;
  }

  // function waitForReceipt(hash, cb) {
  //   web3.eth.getTransactionReceipt(hash, function (err, receipt) {
  //     if (err) {
  //       error(err);
  //     }

  //     if (receipt !== null) {
  //       // Transaction went through
  //       if (cb) {
  //         cb(receipt);
  //       }
  //     } else {
  //       // Try again in 1 second
  //       window.setTimeout(function () {
  //         waitForReceipt(hash, cb);
  //       }, 1000);
  //     }
  //   });
  // }

};

module.exports = utils;
