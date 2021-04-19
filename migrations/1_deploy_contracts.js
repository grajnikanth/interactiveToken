const InteractiveToken = artifacts.require("InteractiveToken");
const Contribution = artifacts.require("Contribution");

// Assign the startTime and endTime  in seconds from epoch to initialize the 'InteractiveToken' contract
let startTime = 1618792930;
let endTime = startTime + 5*60*60;

// deploy 'InteractiveToken' and 'Contribution' contracts. 
// to deploy 'Contribution' contract provide the address of the 'InteractiveToken' contract
module.exports = function(deployer) {
    deployer.deploy(InteractiveToken, startTime, endTime)
    .then(() => {
        return deployer.deploy(Contribution, InteractiveToken.address);
    });
};