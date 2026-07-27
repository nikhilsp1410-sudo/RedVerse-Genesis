# RedVerse Genesis: Launch Execution Checklist

This master checklist is designed to execute the deployment and launch of the RedVerse Genesis collection with absolute zero tolerance for errors.

**Execute in strict chronological order.**

---

## Phase 1: Pre-Deployment Verification
> [!CAUTION]
> Once assets and metadata are uploaded to IPFS and the contract is minted, changes are immutable. Ensure absolute perfection before proceeding past this phase.

- `[ ]` **Final Artwork Verification**
  - Verify all 100 images are rendered in full resolution (Unreal Engine 5 AAA quality).
  - Confirm file sizes are under the Pinata gateway limit.
  - Verify no empty PNGs or corrupt files exist in `artwork/raw/`.
- `[ ]` **Metadata Verification**
  - Ensure all 100 JSON files match the ERC-721 standard perfectly.
  - Double-check that traits, rarities, and the assigned `Rank` align exactly with the generation rules.
- `[ ]` **Final Backup Strategy**
  - Backup the entire `ai/prompts`, `artwork/raw`, and `artwork/metadata` folders to cold storage.
  - Ensure the private keys utilized for deployment are backed up offline.

---

## Phase 2: Decentralized Storage (IPFS Upload Order)
> [!IMPORTANT]
> The upload order is critical. Images must be uploaded *before* metadata so the CIDs can be injected into the JSON files.

- `[ ]` **1. Upload Images to IPFS**
  - Upload the `artwork/raw` folder containing `001.png` - `100.png` to Pinata.
  - Record the `IMAGE_FOLDER_CID`.
- `[ ]` **2. Inject CID into Metadata**
  - Run a batch script to replace `<IPFS_CID_PLACEHOLDER>` with the `IMAGE_FOLDER_CID` in all 100 JSON files.
- `[ ]` **3. Upload Metadata to IPFS**
  - Upload the `artwork/metadata/nfts` folder to Pinata.
  - Record the `METADATA_FOLDER_CID` (This will become the `BaseURI` for the smart contract).

---

## Phase 3: Smart Contract Readiness
- `[ ]` **Gas Optimization Review**
  - Audit the ERC-721A smart contract for efficient batch-minting gas costs.
  - Ensure custom errors are used instead of `require` strings to save gas.
- `[ ]` **Royalty Verification**
  - Implement ERC-2981 royalty standard within the contract (e.g., 5% royalty to the treasury wallet).
- `[ ]` **Smart Contract Deployment Checklist**
  - Configure `BaseURI` to `ipfs://METADATA_FOLDER_CID/`.
  - Ensure the Treasury Address and Owner Address are securely configured in the deployment script.
  - Deploy to the Polygon Amoy Testnet for final dry-run.
  - Deploy to the Polygon Mainnet.
- `[ ]` **Contract Verification**
  - Verify the smart contract code on Polygonscan so collectors can read the source code and interact directly.

---

## Phase 4: Application Integration & Web3 Testing
- `[ ]` **Wallet Connection Testing**
  - Verify MetaMask, WalletConnect, and Coinbase Wallet integrations on `localhost:5173`.
  - Ensure correct chain enforcement (rejecting users not on Polygon).
- `[ ]` **Mint Page Testing**
  - Test minting functionality (public mint, allowlist mint).
  - Verify error handling (insufficient funds, sold out).
  - Confirm real-time supply counters update correctly.

---

## Phase 5: Marketplace & Public Facing Preparation
- `[ ]` **Collection Page Preparation**
  - Finalize website copy, lore integration, and interactive RedVerse Canon elements.
  - Deploy the frontend (`npm run build` and push to Vercel/Netlify).
- `[ ]` **Marketplace Compatibility (OpenSea, Magic Eden)**
  - Go to OpenSea/MagicEden and import the contract address.
  - Configure the Creator Studio: setup collection banner, logo, and project description.
  - Confirm the royalties imported correctly from the ERC-2981 standard.
  - Force refresh the metadata on marketplace platforms to ensure assets display perfectly.

**LAUNCH READY.**
