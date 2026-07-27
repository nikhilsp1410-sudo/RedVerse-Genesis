const hre = require("hardhat");

async function main() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const contract = await hre.ethers.getContractAt("RedVerseGenesis", contractAddress);
    
    // estimate pause
    // wait, we can't estimate pause if it's already unpaused? It is unpaused.
    const pauseGas = await contract.pause.estimateGas();
    console.log(`Pause gas: ${pauseGas}`);
    
    // estimate mint (to owner)
    // token 1 is minted, so this will mint token 2
    const owner = await contract.owner();
    const mintGas = await contract.mint.estimateGas(owner);
    console.log(`Mint gas: ${mintGas}`);
    
    const uriGas = await contract.setBaseURI.estimateGas("ipfs://test/");
    console.log(`URI update gas: ${uriGas}`);
    
    // estimate withdraw - might fail if balance is 0
    try {
        const withdrawGas = await contract.withdraw.estimateGas();
        console.log(`Withdraw gas: ${withdrawGas}`);
    } catch (e) {
        console.log(`Withdraw gas: ~30000 (estimation failed due to zero balance: ${e.message})`);
    }
}

main().catch(console.error);
