pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 

/**
* @dev Extends ERC20 Contract to create token 'Interactive Token' with symbol 'IDT'
* Upstate Interactive Smart Contract Developer Position Coding Challenge
*
* This contract creates a ERC 20 token. These tokens are allowed to be transferred betweeen
* certain predefined allowed timeframe.
* Initial supply = 1000,000. Contract creator is assigned all initial token created.
*/
contract InteractiveToken is ERC20 {

    uint public INITIAL_SUPPLY = 1000000; //Set total supply of tokens
    //startTime - the unix time from epoch in seconds after which contract will allow token transfer
    uint public startTime; 
    //endTime - the unix time from epoch in seconds beofre which contract is allowed to do token transfers
    uint public endTime;

    /**
    * @dev Contract constructor - Token name and symbol are initialized
    *
    * startTime and endTime parameters are initialized 
    */
    constructor(uint _startTime, uint _endTime) ERC20("Interactive Token", "IDT") {

        _mint(msg.sender, INITIAL_SUPPLY);
        startTime = _startTime;
        endTime = _endTime;

    }


    /**
    * @dev getter function to obtain current block timestamp. 
    *
    * Helps with testing the contract
    */
    function timeFunction() public view returns(uint) {
        return block.timestamp;
    }

    /**
     * @dev Moves tokens `amount` from `msg.sender` to `recipient`.
     *
     * overrides the ERC20 'transfer' function adds additional functionality
     * tokens are only transferred within the predefined time band defined by startTime and endTime
     *
     */
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(block.timestamp > startTime && block.timestamp < endTime, 'Current time not within allowed time to transfer');
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * overrides the ERC20 'transferFrom' function and adds additional functionality
     * tokens are only transferred within the predefined time band defined by startTime and endTime
     *
     */

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        require(block.timestamp > startTime && block.timestamp < endTime, 'Current time not within allowed time to transfer');
        super.transferFrom(sender, recipient, amount);
    }



}