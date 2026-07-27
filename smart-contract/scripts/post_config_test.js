const hre = require("hardhat");

async function main() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    if (!contractAddress) {
        console.error("No CONTRACT_ADDRESS found.");
        process.exit(1);
    }
    
    console.log(`Running Post-Configuration Tests on ${contractAddress}...`);
    const contract = await hre.ethers.getContractAt("RedVerseGenesis", contractAddress);
    
    // owner
    const owner = await contract.owner();
    console.log(`owner(): ${owner}`);
    
    // paused
    const paused = await contract.paused();
    console.log(`paused(): ${paused}`);
    
    // maxSupply
    const maxSupply = await contract.MAX_SUPPLY();
    console.log(`maxSupply(): ${maxSupply.toString()}`);
    
    // totalMinted
    const totalMinted = await contract.totalMinted();
    console.log(`totalMinted(): ${totalMinted.toString()}`);
    
    // royaltyInfo
    const royaltyInfo = await contract.royaltyInfo(1, hre.ethers.parseEther("1"));
    console.log(`royaltyInfo(1, 1 POL): Receiver=${royaltyInfo[0]}, Amount=${hre.ethers.formatEther(royaltyInfo[1])} POL`);
    
    // supportsInterface
    const supportsERC721 = await contract.supportsInterface("0x80ac58cd");
    console.log(`supportsInterface(ERC721): ${supportsERC721}`);
    const supportsERC2981 = await contract.supportsInterface("0x2a55205a");
    console.log(`supportsInterface(ERC2981): ${supportsERC2981}`);
    
    // contractURI
    const contractURI = await contract.contractURI();
    console.log(`contractURI(): ${contractURI}`);
    
    // Check if we need to mint Token 1
    if (Number(totalMinted) === 0) {
        console.log("Minting Token 1...");
        // unpause first if needed
        if (paused) {
            let txUnpause = await contract.unpause();
            await txUnpause.wait();
        }
        let tx = await contract.mint(owner);
        await tx.wait();
        console.log("Token 1 Minted!");
    } else if (Number(totalMinted) > 1) {
        console.warn("WARNING: More than 1 token minted!");
    } else {
        console.log("Token 1 already minted.");
    }
    
    // tokenURI(1)
    try {
        const tokenURI = await contract.tokenURI(1);
        console.log(`tokenURI(1): ${tokenURI}`);
    } catch (e) {
        console.log("tokenURI(1) error: " + e.message);
    }
    
    console.log("All tests finished!");
}

main().catch(console.error);
