pragma solidity ^0.8.0;

/**
* @dev Contract interacts with 'InteractiveToken' contract to allow for one to one exchange of 
* ETH to IDT token
* 
* Stores addresses and corresponding ETH exchanged to IDT tokens
*
*/
contract Contribution {

    // 'contributionBalance' stores the ETH contributed by an account
    mapping(address => uint256) public contributionBalance;
    // Instance of 'InteractiveToken' to access functions of the 'IDT' token contract 
    InteractiveToken interactiveToken;

    /**
    * @dev Contract constructor - 'InteractiveToken' instance is initialzed using 'address' of the 
    * deployed contract
    *
    *
    */
    constructor(address InteractiveTokenAddress) {

        interactiveToken = InteractiveToken(InteractiveTokenAddress);
    }

   /**
    * @dev function to exchange ETH to IDT tokens one to one.
    * 'tokenOwner' - address of the account from which IDT tokens shall be exchanged with ETH tokens
    *
    */
    function exchange(address tokenOwner) public payable {
        require(msg.value > 0, 'Contribut ether to exchange for IDT tokens');
        uint etherVal = msg.value/(1 ether);
        contributionBalance[msg.sender] += etherVal;
        interactiveToken.transferFrom(tokenOwner, msg.sender, etherVal);

    }

    /**
    * @dev function to test 'Contribution' contract is properly interacting with 'InteractiveToken' contract.
    * returns the 'startTime' defined in 'InteractiveToken' contract
    *
    */

    function startTime() public view returns(uint) {
        return interactiveToken.startTime();

    }

    /**
    * @dev getter function to obtain the 'ETH' exchanged by an 'account'
    *
    *
    */
    function balance(address accountAddress) public view returns(uint256) {
        return contributionBalance[accountAddress];
    } 

}

/**
* @dev interface to define the functions 'Contribution' contract will need access 
* from the 'InteractiveToken' contract.
*
*/
interface InteractiveToken {

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function startTime() external view returns(uint);
    function endTime() external view returns(uint);
}
