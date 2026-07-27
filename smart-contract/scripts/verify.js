const hre = require("hardhat");

async function main() {
    const contractAddress = process.env.CONTRACT_ADDRESS;

    if (!contractAddress) {
        console.error("Please set CONTRACT_ADDRESS in your .env file.");
        process.exit(1);
    }

    console.log(`Verifying RedVerseGenesis at ${contractAddress}...`);

    try {
        await hre.run("verify:verify", {
            address: contractAddress,
            constructorArguments: [],
        });
        console.log("Verification complete!");
    } catch (e) {
        console.error("Verification failed:", e.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
