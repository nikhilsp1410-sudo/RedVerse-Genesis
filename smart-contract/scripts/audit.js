const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const contractAddress = "0xccFD90167f47c4F890C213Cc4a4611eE91942d0B";
    const RedVerseGenesis = await hre.ethers.getContractAt("RedVerseGenesis", contractAddress);

    const report = {};

    report.contract = contractAddress;
    report.name = await RedVerseGenesis.name();
    report.symbol = await RedVerseGenesis.symbol();
    report.owner = await RedVerseGenesis.owner();
    report.erc721 = await RedVerseGenesis.supportsInterface("0x80ac58cd");
    report.erc2981 = await RedVerseGenesis.supportsInterface("0x2a55205a");
    
    try {
        const [receiver, amount] = await RedVerseGenesis.royaltyInfo(1, 10000);
        report.royaltyReceiver = receiver;
        report.royaltyPercentage = (Number(amount) / 10000) * 100;
    } catch(e) {
        report.royaltyError = e.message;
    }

    try {
        report.tokenURI_1 = await RedVerseGenesis.tokenURI(1);
    } catch(e) {
        report.tokenURI_1 = "Not minted or error: " + e.message;
    }

    report.contractURI = await RedVerseGenesis.contractURI();

    try {
        report.maxSupply = (await RedVerseGenesis.MAX_SUPPLY()).toString();
    } catch(e) {
        report.maxSupply = "Not readable";
    }

    try {
        report.totalMinted = (await RedVerseGenesis.totalMinted()).toString();
    } catch(e) {
        report.totalMinted = "Not readable";
    }

    try {
        report.paused = await RedVerseGenesis.paused();
    } catch(e) {
        report.paused = "Not readable";
    }

    // Verify local JSONs
    report.nft_001_valid = false;
    report.nft_001_image = "";
    try {
        const metadata = JSON.parse(fs.readFileSync("d:/RedVerse/metadata/nft/001.json", "utf8"));
        report.nft_001_valid = true;
        report.nft_001_image = metadata.image;
    } catch (e) {}

    report.collection_valid = false;
    report.collection_image = "";
    try {
        const coll = JSON.parse(fs.readFileSync("d:/RedVerse/metadata/collection.json", "utf8"));
        report.collection_valid = true;
        report.collection_image = coll.image;
        report.collection_banner = coll.banner_image;
        report.collection_featured = coll.featured_image;
    } catch (e) {}

    console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
