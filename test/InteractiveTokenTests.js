const InteractiveToken = artifacts.require("InteractiveToken");
const Contribution = artifacts.require("Contribution");

// Unit tests to verify functionality of 'InteractiveToken' and 'Contribution' contracts
var accounts;

// initialize 'startTime' and 'endTime' variables matching those used in the '1_deploy_contracts.js' file
let startTime = 1618792930;
let endTime = startTime + 5*3600;
// 'INITIAL_SUPPLY' to match the 'IDT' token initial supply
let INITIAL_SUPPLY = 1000000

contract('Interactive Token Tests', async (accs) => {
    
    accounts = accs;
    owner = accounts[0];

    
    // Test to check the Token name initialized in the 'InteractiveToken' contract
    it('Token name is correct', async () => {

        instance = await InteractiveToken.deployed();
        console.log('Address of the contract'+instance.address);
        tokenName = await instance.name();
        console.log('Name obtained from token contract function call: '+tokenName);
        ownerBalance = await instance.balanceOf(owner);
        console.log('Owner address balance: '+ownerBalance);
        assert.equal(tokenName, 'Interactive Token');
    });

    //test to check the Initial supply of tokens in the 'InteractiveToken' contract
    it('Token Initial Supply is correct', async () => {

        instance = await InteractiveToken.deployed();
        console.log('Address of the contract'+instance.address);
        tokenSupply = await instance.INITIAL_SUPPLY.call();
        console.log('Token Initial Supply obtained from Smart Contract: '+tokenSupply);
        assert.equal(tokenSupply, 1000000);
    });

    //Test token symbol 'IDT' was properly initialized in the 'InteractiveToken' contract
    it('Token Symbol is correct', async () => {

        instance = await InteractiveToken.deployed();
        tokenSymbol = await instance.symbol();
        let stime = await instance.startTime.call();
        console.log('start time in program: '+stime);
        let etime = await instance.endTime.call();
        console.log('end time in program: '+etime);

        console.log('Token symbol obtained from smart contract '+tokenSymbol);
        assert.equal(tokenSymbol, "IDT");
    });

    // Test to verify the 'startTime' initialized in the 'InteractiveToken' contract
    it('start time is correct', async() => {
        instance = await InteractiveToken.deployed();
        let stime = await instance.startTime.call();
        let etime = await instance.endTime.call();
        console.log('start time in program: '+stime);
        console.log('end time in program: '+etime);
        ctime = await instance.timeFunction();
        console.log('Block timestamp: '+ctime);
        assert.equal(startTime, stime);
    });

    // // Test to verify the 'endTime' initialized in the 'InteractiveToken' contract
    it('End time is correct', async() => {
        instance = await InteractiveToken.deployed();
        let etime = await instance.endTime.call();
        console.log('end time in program: '+etime);
        ctime = await instance.timeFunction();
        console.log('Block timestamp: '+ctime);
        assert.equal(endTime, etime);
    });

    /*
    // Use test below when the tokens are being transferred at a time not allowed by the cotract
    it('transfer does not work when time is out of range', async() => {
        let amount = 100;
        instance = await InteractiveToken.deployed();

        let isValidTransfer = true;
        try {
            resp = await instance.transfer(accounts[1], amount);
            acct1Balance = await instance.balanceOf(accounts[1]);
            console.log('Account 1 balance after transer: '+acct1Balance);
            ownerBalance = await instance.balanceOf(owner);
            console.log('Owner balance after transer: '+ownerBalance);
        }
        catch(e) {
            isValidTransfer = false;
        }
    
        assert.equal(isValidTransfer, false);
    });
    */

    // Use test below when the tokens are being transferred at a time when allowed by the cotract
    // test to verify that the 'InteractiveToken' contract allows only transfer between the
    // 'startTime' and 'endTime'
    it('transfer work only when appropriate time is working', async() => {
        let amount = 200;
        instance = await InteractiveToken.deployed();
        resp = await instance.transfer(accounts[1], amount);
        console.log('Return value from transfer function call: '+resp);
       
        acct1Balance = await instance.balanceOf(accounts[1]);
        console.log('Account 1 balance after transer: '+acct1Balance);
        ownerBalance = await instance.balanceOf(owner);
        console.log('Owner balance after transer: '+ownerBalance);

        assert.equal(acct1Balance, amount);
    });

    // test the 'Contribution' contract is properly interfacing with 'InteractiveToken' 
    // contract.
    it('Test Contribution contract is working properly', async() => {
        instance1 = await InteractiveToken.deployed();
        instance2 = await Contribution.deployed();
        
        let allowance = 50;

        sTime = await instance2.startTime();
        console.log('Starttime obtained from Contribution contract: '+sTime);

        // Test the allowance allocation to the Contribution contract to spend tokens
        await instance1.approve(instance2.address, allowance);
        x = await instance1.allowance(owner, instance2.address);

        console.log('Allowance assigned to contribution contract: '+x);

        assert.equal(startTime, sTime);
    });

    // Test the functionality of 'exchange' and 'balance' functions inside the 'Contribution'
    // contract 
    it('Exchange of ETH to IDT tokens is working', async() => {
        instance1 = await InteractiveToken.deployed();
        instance2 = await Contribution.deployed();
        
        let tokenAmount = 10;
        let ethAmount = web3.utils.toWei(tokenAmount.toString(), "ether");

        console.log('ethAmount value is: '+ethAmount);

        // Before tokens can be exchanged for ETH, the owner of the 'IDT' tokens shall
        // approve that 'Contribution' contract can spend on token 'owner' behalf
        await instance1.approve(instance2.address, tokenAmount);
        x = await instance1.allowance(owner, instance2.address);
        console.log('Allowance assigned to contribution contract: '+x);

        await instance2.exchange(owner, {from: accounts[2], value: ethAmount});

        y = await instance2.balance(accounts[2]);
        console.log('Current contribution by account[1] is: '+y);

        ownerBalance = await instance1.balanceOf(owner);
        acct1Balance = await instance1.balanceOf(accounts[2]);
        
        assert.equal(tokenAmount, y);
        assert.equal(tokenAmount, acct1Balance, 'Account 2 IDT token balance is incorrect');

    });

});