const {copy, linkBytecode} = require ("./utils.js");
const fs = require('fs');
const {contracts_build_directory} = require ('../truffle.js');

const TestContract = artifacts.require("TestContract");

// copy artifact for placeholder replacements
copy ("MutableForwarder", "TestContractForwarder", contracts_build_directory);
const TestContractForwarder = artifacts.require("TestContractForwarder");

const forwarderTargetPlaceholder = "beefbeefbeefbeefbeefbeefbeefbeefbeefbeef";

module.exports = function(deployer, network, accounts) {

  const address = accounts [0];
  const gas = 4612388;
  const opts = {gas: gas, from: address};

  console.log(contracts_build_directory);

  deployer.deploy (TestContract, opts)
    .then (instance => {
      linkBytecode(TestContractForwarder, forwarderTargetPlaceholder, instance.address);
      return deployer.deploy(TestContractForwarder, opts);
    })
    .then (instance => instance.target())
    .then (res => {
      console.log ("@@@ TestContractForwarder target:", res);
      return Promise.all([ TestContract.deployed(), TestContractForwarder.deployed() ]);
    })
    .then (([testContract, testContractForwarder]) => TestContract.at(testContractForwarder.address)
           .construct(1, opts))
    .then (tx => {
      console.log ("@@@ TestContract/construct tx", tx.tx, "successful");
      return TestContractForwarder.deployed();
    })
    .then (instance => {
      var testContract = TestContract.at(instance.address);
      return Promise.all([ testContract.value(), testContract.wasConstructed() ]);
    })
    .then (([res1, res2]) => {
      console.log ("@@@ TestContract/value :", res1.c [0]);
      console.log ("@@@ TestContract/wasConstructed :", res2);
    });


  deployer.then (function () {
    console.log ("Done");
  });

}
