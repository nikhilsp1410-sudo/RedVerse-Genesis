const { ethers } = require("hardhat");

async function main() {
    console.log("Starting Minting Process...");

    // Contract Configuration
    const CONTRACT_ADDRESS = "0xccFD90167f47c4F890C213Cc4a4611eE91942d0B";
    const MAX_SUPPLY = 20;

    // Setup Signer and Contract
    const [deployer] = await ethers.getSigners();
    console.log(`Using deployer account: ${deployer.address}`);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log(`Account balance: ${ethers.formatEther(balance)} MATIC`);

    const RedVerseGenesis = await ethers.getContractFactory("RedVerseGenesis");
    const contract = RedVerseGenesis.attach(CONTRACT_ADDRESS);

    // Pre-Flight Check: Verify existing minted amount
    const totalMintedBig = await contract.totalMinted();
    const totalMinted = Number(totalMintedBig);
    
    console.log(`Currently minted: ${totalMinted} / ${MAX_SUPPLY}`);

    const remaining = MAX_SUPPLY - totalMinted;
    if (remaining <= 0) {
        console.log("Collection is already fully minted! Aborting safely.");
        return;
    }

    console.log(`Minting remaining ${remaining} NFTs sequentially...`);

    const mintResults = [];

    // Loop through remaining supply
    for (let i = 0; i < remaining; i++) {
        const targetTokenId = totalMinted + i + 1;
        console.log(`\n[Minting Token ID #${targetTokenId}] -> Sending transaction...`);
        
        try {
            // Initiate Mint
            const tx = await contract.mint(deployer.address);
            console.log(`   Transaction hash: ${tx.hash}`);
            console.log(`   Waiting for confirmations (2 blocks)...`);
            
            // Wait for 2 block confirmations
            const receipt = await tx.wait(2);
            
            console.log(`   Confirmed in block ${receipt.blockNumber}! Gas used: ${receipt.gasUsed}`);

            // Post-Mint Verification
            const owner = await contract.ownerOf(targetTokenId);
            const tokenURI = await contract.tokenURI(targetTokenId);

            console.log(`   Verification: Token #${targetTokenId} is owned by ${owner}`);
            console.log(`   Verification: TokenURI = ${tokenURI}`);

            if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
                console.error(`   ERROR: Ownership mismatch for Token #${targetTokenId}!`);
            } else {
                console.log(`   SUCCESS: Token #${targetTokenId} verified!`);
                mintResults.push({
                    tokenId: targetTokenId,
                    hash: tx.hash,
                    uri: tokenURI
                });
            }

        } catch (err) {
            console.error(`   FAILED to mint Token #${targetTokenId}: ${err.message}`);
            console.error(`   Aborting remainder of loop for safety.`);
            break;
        }
    }

    // Final Output Summary
    console.log("\n==================================================");
    console.log("MINTING SUMMARY");
    console.log("==================================================");
    console.log(`Total successfully minted in this run: ${mintResults.length}`);
    mintResults.forEach(r => {
        console.log(`- Token #${r.tokenId} | TX: ${r.hash}`);
    });
    console.log("==================================================");

    const newTotal = await contract.totalMinted();
    console.log(`Final Collection Supply: ${newTotal} / ${MAX_SUPPLY}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("FATAL ERROR:", error);
        process.exit(1);
    });
