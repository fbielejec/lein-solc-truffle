pragma solidity ^0.4.18;

import "../proxy/DelegateProxy.sol";

contract MutableForwarder is DelegateProxy {

  address public target = 0xBEeFbeefbEefbeEFbeEfbEEfBEeFbeEfBeEfBeef;
 
  /* function setTarget(address _target) public { */
  /*   target = _target; */
  /* } */

  function()
    public
    payable {
    delegatedFwd(target, msg.data);
  }

}
