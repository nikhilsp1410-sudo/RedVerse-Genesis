const hre = require("hardhat");

async function main() {
    const contractAddress = "0xccFD90167f47c4F890C213Cc4a4611eE91942d0B";
    const newContractURI = "ipfs://bafkreieooha2y6b6pjnjz2wopw7ftj6u7kq4yjrzip3l4jv52drjx5y5am";

    console.log(`Connecting to RedVerseGenesis at ${contractAddress}...`);
    const RedVerseGenesis = await hre.ethers.getContractAt("RedVerseGenesis", contractAddress);
    
    console.log(`Setting contract URI to ${newContractURI}...`);
    const tx = await RedVerseGenesis.setContractURI(newContractURI);
    console.log(`Transaction Hash: ${tx.hash}`);
    
    console.log("Waiting for confirmation...");
    await tx.wait();
    console.log("Transaction confirmed.");

    console.log("--- Verification ---");
    const contractURI = await RedVerseGenesis.contractURI();
    console.log(`contractURI(): ${contractURI}`);
    
    let tokenURI1 = "Error";
    try {
        tokenURI1 = await RedVerseGenesis.tokenURI(1);
    } catch(e) {
        tokenURI1 = e.message;
    }
    console.log(`tokenURI(1): ${tokenURI1}`);
    
    const owner = await RedVerseGenesis.owner();
    console.log(`owner(): ${owner}`);
    
    const supportsERC721 = await RedVerseGenesis.supportsInterface("0x80ac58cd");
    console.log(`supportsInterface(ERC721): ${supportsERC721}`);
    
    const supportsERC2981 = await RedVerseGenesis.supportsInterface("0x2a55205a");
    console.log(`supportsInterface(ERC2981): ${supportsERC2981}`);

    console.log("Status: Verification Complete");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
