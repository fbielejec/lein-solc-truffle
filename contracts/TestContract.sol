pragma solidity ^0.4.24;

contract TestContract {

  // needs to be here becasue contract is used via MutableForwarder 
  address private dummyTarget;
  
  uint public value;
  bool public wasConstructed;

  /**
   * @dev Constructor for this contract.
   * Native constructor is not used, because we use a forwarder pointing to single instance of this contract,
   * therefore constructor must be called explicitly.
   */
  function construct(uint _value)
    external
  {
    value = _value; 
    wasConstructed = true;  
  }
 
}
