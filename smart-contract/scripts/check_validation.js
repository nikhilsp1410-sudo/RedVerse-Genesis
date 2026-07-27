require('dotenv').config();
const { ethers } = require('ethers');

async function main() {
    console.log("--- Fresh Validation Check ---");
    
    // 1. RPC & Chain ID
    const rpcUrl = process.env.POLYGON_RPC_URL;
    console.log(`RPC URL: ${rpcUrl}`);
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    
    let network;
    try {
        network = await provider.getNetwork();
        console.log(`Chain ID: ${network.chainId}`);
    } catch (e) {
        console.log(`RPC Connectivity Error: ${e.message}`);
        process.exit(1);
    }
    
    // 2. Wallet & Balance
    let privateKey = process.env.PRIVATE_KEY;
    if (!privateKey.startsWith('0x')) privateKey = '0x' + privateKey;
    
    let wallet;
    try {
        wallet = new ethers.Wallet(privateKey, provider);
        console.log(`Wallet Address: ${wallet.address}`);
    } catch (e) {
        console.log(`Wallet Error: ${e.message}`);
        process.exit(1);
    }
    
    try {
        const rawBalance = await provider.getBalance(wallet.address);
        console.log(`Raw Balance (Wei): ${rawBalance.toString()}`);
        console.log(`Formatted Balance (POL): ${ethers.formatEther(rawBalance)}`);
    } catch (e) {
        console.log(`Balance Error: ${e.message}`);
    }
}

main();
