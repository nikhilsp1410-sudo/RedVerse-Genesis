# RedVerse

Forging the Future of Digital Creation.

---

## Features

React

Three.js

Polygon

ERC721

NFT Collection

Interactive Lore

Premium UI

---

## Tech Stack

React

Vite

Tailwind

Framer Motion

Three.js

Node.js

Express

MongoDB

ethers.js

Hardhat

---

## Installation

npm install

npm run dev

---

## Backend Architecture & Upload APIs

The stateless Node.js/Express backend handles rate-limiting, validations, IPFS pinning, and lightweight configuration APIs. The blockchain remains the single source of truth for the collection state.

#### API Endpoints
- **GET /api/v1/config**: Public dApp configuration (contract address, network ID).
- **GET /api/v1/health**: Backend health status.
- **GET /api/v1/stats**: Project statistics.
- **POST /api/v1/upload/image**: Pin an image to IPFS via Pinata (Max 10MB; PNG/JPEG/WEBP). Rate-limited (20/min).
- **POST /api/v1/upload/json**: Pin JSON metadata to IPFS via Pinata. Rate-limited (20/min).

#### Upload Architecture (Security)
To protect credentials, the frontend **never** communicates directly with Pinata. 
**Flow:** `Frontend -> Express Backend (Validates & Rate-Limits) -> Storage Service -> Pinata -> IPFS`
The backend leverages a generic storage abstraction (`backend/src/services/storage`), allowing for easy provider swaps in the future.

### Environment Setup
A `.env.example` file is provided in the root directory containing all necessary environment configurations.

**Backend Required Environment Variables:**
- `PINATA_JWT`: Your Pinata API JWT for IPFS pinning.
- `MAX_UPLOAD_SIZE`: Maximum upload size in bytes (defaults to 10485760 - 10MB).
- `PINATA_GATEWAY_URL`: Optional gateway URL for IPFS files.

**Important:** Never place Pinata secrets in the `frontend/.env` file. All Pinata configurations must remain strictly in the backend environment.

---

## Screenshots

Hero

Collection

Lore

Mint

---

## Roadmap

Link to ROADMAP.md

---

## License

MIT