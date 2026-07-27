const hre = require("hardhat");

async function main() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const contractURI = process.env.CONTRACT_URI;

    if (!contractAddress || !contractURI) {
        console.error("Please set CONTRACT_ADDRESS and CONTRACT_URI in your .env file.");
        process.exit(1);
    }

    const RedVerseGenesis = await hre.ethers.getContractAt("RedVerseGenesis", contractAddress);
    
    console.log(`Setting contract URI to ${contractURI} for contract ${contractAddress}...`);
    
    try {
        const tx = await RedVerseGenesis.setContractURI(contractURI);
        console.log(`Transaction Hash: ${tx.hash}`);
        
        await tx.wait();
        console.log("Contract URI set successfully!");
    } catch (e) {
        console.error("Failed to set Contract URI:", e.message);
    }
}

main().catch((error) => {
    console.error("Script execution failed:", error);
    process.exitCode = 1;
});
