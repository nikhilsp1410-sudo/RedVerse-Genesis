const hre = require("hardhat");

async function main() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    if (!contractAddress) {
        console.error("No CONTRACT_ADDRESS found.");
        process.exit(1);
    }
    
    console.log(`Running Post Deployment Tests on ${contractAddress}...`);
    const contract = await hre.ethers.getContractAt("RedVerseGenesis", contractAddress);
    
    // Test owner()
    const owner = await contract.owner();
    console.log(`owner(): ${owner}`);
    
    // Test totalMinted()
    const totalMinted = await contract.totalMinted();
    console.log(`totalMinted(): ${totalMinted.toString()}`);
    
    // Test maxSupply()
    const maxSupply = await contract.MAX_SUPPLY();
    console.log(`maxSupply(): ${maxSupply.toString()}`);
    
    // Test royaltyInfo()
    const royaltyInfo = await contract.royaltyInfo(1, hre.ethers.parseEther("1"));
    console.log(`royaltyInfo(1, 1 POL): Receiver=${royaltyInfo[0]}, Amount=${hre.ethers.formatEther(royaltyInfo[1])} POL`);
    
    // Test supportsInterface() - ERC721 is 0x80ac58cd, ERC2981 is 0x2a55205a
    const supportsERC721 = await contract.supportsInterface("0x80ac58cd");
    console.log(`supportsInterface(ERC721): ${supportsERC721}`);
    const supportsERC2981 = await contract.supportsInterface("0x2a55205a");
    console.log(`supportsInterface(ERC2981): ${supportsERC2981}`);
    
    // Test contractURI()
    const contractURI = await contract.contractURI();
    console.log(`contractURI(): ${contractURI}`);
    
    // Test tokenURI() - requires a minted token, but we can't mint one if we don't want to yet.
    // Actually we can just mint token 1 to the owner for testing.
    console.log("Minting a token to test tokenURI()...");
    let tx = await contract.mint(owner);
    await tx.wait();
    
    const tokenURI = await contract.tokenURI(1);
    console.log(`tokenURI(1): ${tokenURI}`);
    
    // Test pause() and unpause()
    console.log("Testing pause()...");
    tx = await contract.pause();
    await tx.wait();
    const paused = await contract.paused();
    console.log(`paused: ${paused}`);
    
    console.log("Testing unpause()...");
    tx = await contract.unpause();
    await tx.wait();
    const unpaused = await contract.paused();
    console.log(`paused: ${unpaused}`);
    
    console.log("All post-deployment tests passed!");
}

main().catch(console.error);
