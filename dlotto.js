Web3 = require('web3');

// metamask injects web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(Web3.currentProvider);
    console.log("existed");
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    console.log("didn't exist");
}


/* Contract Parameters */
abi = JSON.parse('[{"constant":false,"inputs":[],"name":"getPotSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getLastPot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tickets","type":"uint256"}],"name":"buyTickets","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"getLastDuration","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getBlocksRemaining","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getDuration","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable",\
"type":"function"},{"constant":false,"inputs":[],"name":"getLastEndBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getLastWinner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"test","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
DLottoContract = web3.eth.contract(abi);
contractAddress = '0x7b756637ec6e722fe159fb3210b1d060a0dd00fb';
contractInstance = DLottoContract.at(contractAddress);
userAddress = web3.eth.accounts[0];

// update with current information
document.getElementById("potSize").innerText = "PotSize: " + contractInstance.getPotSize.call().toString();
document.getElementById("blocksLeft").innerText = "Blocks Left: " + contractInstance.getBlocksRemaining.call().toString(); // need to call first since updates everything else if closed
document.getElementById("duration").innerText = "Duration (Blocks): " + contractInstance.getDuration.call().toString();

document.getElementById("lastWinner").innerText = "Last Winner: " + contractInstance.getLastWinner.call().toString();
document.getElementById("lastPot").innerText = "Last Pot Size: " + contractInstance.getLastPot.call().toString();
document.getElementById("lastDuration").innerText = "Last Duration (Blocks): " + contractInstance.getLastDuration.call().toString();
document.getElementById("lastEndBlock").innerText = "Last Ending Block: " + contractInstance.getLastEndBlock.call().toString();


// Need to hook up amount text box with the purchase command
function buyTickets() {
    // get textbox value
    amount = tickets.innerText;

    // then buy that much ether from the account
    //web3.eth.sendTransaction({from: web3.eth.coinbase, to: contractAddress, value: web3.toWei(amount, "wei")});
    contractInstance.buyTickets(amount, {from: userAddress, value: amount});
    console.log(contractInstance.getPotSize.call().toString());
}
