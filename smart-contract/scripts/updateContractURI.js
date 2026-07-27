const hre = require("hardhat");

async function main() {
    const contractAddress = "0xccFD90167f47c4F890C213Cc4a4611eE91942d0B";
    const targetContractURI = "ipfs://bafkreif37gtotpgbhgpwmzkdlyih5trg5vgjxt5vhgr5s6esjqeqjue4ua";

    console.log(`\n=========================================`);
    console.log(`UPDATING CONTRACT URI ON POLYGON MAINNET`);
    console.log(`=========================================\n`);

    // 1. Verify the deployed contract address
    console.log(`Target Contract Address: ${contractAddress}`);
    const RedVerseGenesis = await hre.ethers.getContractAt("RedVerseGenesis", contractAddress);

    // 2. Verify the signer is the contract owner
    const [signer] = await hre.ethers.getSigners();
    console.log(`Signer Address: ${signer.address}`);
    
    const owner = await RedVerseGenesis.owner();
    if (signer.address.toLowerCase() !== owner.toLowerCase()) {
        throw new Error(`Signer ${signer.address} is not the contract owner (${owner})`);
    }
    console.log(`✓ Signer verified as contract owner`);

    // 3. Read the current contractURI()
    const previousContractURI = await RedVerseGenesis.contractURI();
    console.log(`Current contractURI: ${previousContractURI}`);

    // 4. Send the transaction
    console.log(`\nSending transaction to setContractURI...`);
    const tx = await RedVerseGenesis.setContractURI(targetContractURI);
    console.log(`Transaction Hash: ${tx.hash}`);
    
    // 5. Wait for transaction confirmation
    console.log(`Waiting for confirmation...`);
    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);

    // 6. Read contractURI() again
    const newContractURI = await RedVerseGenesis.contractURI();
    
    // 7. Verify it exactly equals the target
    if (newContractURI !== targetContractURI) {
        throw new Error(`Verification failed! Expected ${targetContractURI} but got ${newContractURI}`);
    }

    // 8. Print Final Report
    console.log(`\n=========================================`);
    console.log(`UPDATE SUCCESSFUL`);
    console.log(`=========================================`);
    console.log(`✓ Transaction Hash: ${tx.hash}`);
    console.log(`✓ Block Number: ${receipt.blockNumber}`);
    console.log(`✓ Gas Used: ${receipt.gasUsed.toString()}`);
    console.log(`✓ Previous contractURI: ${previousContractURI}`);
    console.log(`✓ New contractURI: ${newContractURI}`);
    console.log(`✓ Confirmation: The contractURI update exactly matches the target.\n`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

