const hre = require("hardhat");

async function main() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const baseURI = process.env.BASE_URI;

    if (!contractAddress || !baseURI) {
        console.error("Please set CONTRACT_ADDRESS and BASE_URI in your .env file.");
        process.exit(1);
    }

    const RedVerseGenesis = await hre.ethers.getContractAt("RedVerseGenesis", contractAddress);
    
    console.log(`Setting base URI to ${baseURI} for contract ${contractAddress}...`);
    
    try {
        const tx = await RedVerseGenesis.setBaseURI(baseURI);
        console.log(`Transaction Hash: ${tx.hash}`);
        
        await tx.wait();
        console.log("Base URI set successfully!");
    } catch (e) {
        console.error("Failed to set Base URI:", e.message);
    }
}

main().catch((error) => {
    console.error("Script execution failed:", error);
    process.exitCode = 1;
});
