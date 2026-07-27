const hre = require("hardhat");

async function main() {
    console.log("Deploying RedVerseGenesis...");

    const RedVerseGenesis = await hre.ethers.getContractFactory("RedVerseGenesis");
    const contract = await RedVerseGenesis.deploy();

    await contract.waitForDeployment();
    const address = await contract.getAddress();
    
    console.log(`RedVerseGenesis deployed to: ${address}`);
    
    const txHash = contract.deploymentTransaction().hash;
    console.log(`Transaction Hash: ${txHash}`);
    
    console.log("Deployment successful! Run the verify script next.");
}

main().catch((error) => {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
});