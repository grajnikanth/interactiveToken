# Upstate Interactive Interview Challenge for Smart Contract Developer Position

In this project, I created solidity contracts and developed unit tests using truffle to meet the Interview challenge sent to me by email. The local blockchain 
was deployed using the "truffle develop" command. The accounts generated by this command were used to test the contracts.

All the solidity contract files are located in the /contracts/ folder.

## Smart Contracts
I used the ERC20 contract from openzeppelin open source code located at https://github.com/OpenZeppelin/openzeppelin-
contracts/blob/master/contracts/token/ERC20/ERC20.sol to develop my contracts.
The contracts I created are as follows:
### InteractiveToken.sol
This contract creates the ERC20 Token called "IDT".
### Contribution.sol
This contract deals with exchange of ETH with "IDT" token

## Steps to run the smart contracts and tests
1. Check the file /migrations/1_deploy_contracts.js and update the startTime and endTime variables. 
2. Check the file /test/InteractiveTokenTests.js file and update the startTime and endTime variables to match the variables assigned in step 1.
3. Open terminal console in the project folder and run command "truffle develop"
4. Run command "compile". 
5. Run command "migrate".
6  Run command "test".

All the tests should run and pass.
