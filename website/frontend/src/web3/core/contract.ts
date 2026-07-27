import { Contract } from 'ethers';
import { CONTRACT_ADDRESS } from './config';
import { web3Manager } from './web3';

// Standard ERC721 + EIP-2981 Human-Readable ABI
export const RedVerseGenesisABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
  "function royaltyInfo(uint256 tokenId, uint256 salePrice) view returns (address receiver, uint256 royaltyAmount)",
  "function owner() view returns (address)",
  "function paused() view returns (bool)",
  "function contractURI() view returns (string)",
  "function totalMinted() view returns (uint256)",
  "function MAX_SUPPLY() view returns (uint256)"
];

/**
 * Gets a read-only instance of the contract using the public RPC.
 * Useful for querying data without requiring the user to connect a wallet.
 */
export const getReadOnlyContract = (): Contract => {
  const provider = web3Manager.getRpcProvider();
  return new Contract(CONTRACT_ADDRESS, RedVerseGenesisABI, provider);
};

/**
 * Gets a read-write instance of the contract using the injected browser wallet.
 * Required for sending transactions.
 */
export const getSignerContract = async (): Promise<Contract> => {
  const provider = await web3Manager.getBrowserProvider();
  const signer = await provider.getSigner();
  return new Contract(CONTRACT_ADDRESS, RedVerseGenesisABI, signer);
};
