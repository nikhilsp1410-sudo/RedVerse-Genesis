const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const contractAddress = "0xccFD90167f47c4F890C213Cc4a4611eE91942d0B";
    const baseURI = "ipfs://bafybeiaasqvbghpbxzvl5dqgjg42nk5jkqdlb4dxsjyihfuaxgobawnvfy/";
    const contractURI = "ipfs://bafkreiavr23obk2jprd26wf2w6zffnvirfvkcfumngqlgexpuxpd7o7t4m";

    const RedVerseGenesis = await hre.ethers.getContractAt("RedVerseGenesis", contractAddress);
    
    console.log(`Setting base URI to ${baseURI}...`);
    const tx1 = await RedVerseGenesis.setBaseURI(baseURI);
    console.log(`BaseURI Transaction Hash: ${tx1.hash}`);
    
    console.log(`Setting contract URI to ${contractURI}...`);
    const tx2 = await RedVerseGenesis.setContractURI(contractURI);
    console.log(`ContractURI Transaction Hash: ${tx2.hash}`);
    
    await tx1.wait();
    await tx2.wait();
    console.log("Both transactions confirmed.");

    console.log("--- Verification ---");
    const owner = await RedVerseGenesis.owner();
    console.log(`owner(): ${owner}`);
    
    const totalMinted = await RedVerseGenesis.totalMinted();
    console.log(`totalMinted(): ${totalMinted.toString()}`);
    
    let tokenURI1 = "Error or not minted";
    try {
        tokenURI1 = await RedVerseGenesis.tokenURI(1);
    } catch(e) {
        tokenURI1 = e.message;
    }
    console.log(`tokenURI(1): ${tokenURI1}`);
    
    const currentContractURI = await RedVerseGenesis.contractURI();
    console.log(`contractURI(): ${currentContractURI}`);
    
    const supportsERC721 = await RedVerseGenesis.supportsInterface("0x80ac58cd");
    console.log(`supportsInterface(ERC721): ${supportsERC721}`);
    
    const supportsERC2981 = await RedVerseGenesis.supportsInterface("0x2a55205a");
    console.log(`supportsInterface(ERC2981): ${supportsERC2981}`);

    const [royaltyReceiver, royaltyAmount] = await RedVerseGenesis.royaltyInfo(1, 10000);
    const royaltyPercentage = (Number(royaltyAmount) / 10000) * 100;
    console.log(`Royalty receiver: ${royaltyReceiver}`);
    console.log(`Royalty percentage: ${royaltyPercentage}%`);

    console.log("--- Checking 001.json metadata locally ---");
    const metadataPath = "d:/RedVerse/metadata/nft/001.json";
    if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
        console.log(`001.json image references: ${metadata.image}`);
    } else {
        console.log("001.json not found locally.");
    }

    console.log("Final deployment status: Verification Complete");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
