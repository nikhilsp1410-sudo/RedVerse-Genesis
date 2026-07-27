import { Contract } from 'ethers';
import { providerService } from './providerService';
import { transactionService } from './transactionService';
import { web3Config } from '../config';

const genesisAbi = [
  "function mint(uint256 quantity) payable",
  "function totalSupply() view returns (uint256)",
  "function maxSupply() view returns (uint256)",
  "function mintPrice() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)"
];

class ContractService {
  constructor() {
    this.address = web3Config.contracts.genesis;
  }

  async getReadOnlyContract() {
    const provider = await providerService.getProvider();
    return new Contract(this.address, genesisAbi, provider);
  }

  async getSignerContract() {
    const signer = await providerService.getSigner();
    return new Contract(this.address, genesisAbi, signer);
  }

  async getTotalSupply() {
    try {
      const contract = await this.getReadOnlyContract();
      const supply = await contract.totalSupply();
      return Number(supply);
    } catch (error) {
      console.error("Error fetching total supply:", error);
      return 0;
    }
  }

  async getMintPrice() {
    try {
      const contract = await this.getReadOnlyContract();
      const price = await contract.mintPrice();
      return price;
    } catch (error) {
      console.error("Error fetching mint price:", error);
      return null;
    }
  }

  async mintNFT(quantity, pricePerItem) {
    const contract = await this.getSignerContract();
    const value = pricePerItem * BigInt(quantity);
    
    const { gasLimit, error } = await transactionService.estimateGas(contract, 'mint', [quantity], value.toString());
    if (error) throw new Error(error);

    const tx = await contract.mint(quantity, { value, gasLimit: gasLimit || undefined });
    return tx;
  }
  
  async getUserNFTs(address) {
    try {
      const contract = await this.getReadOnlyContract();
      const balance = await contract.balanceOf(address);
      const tokens = [];
      for (let i = 0; i < Number(balance); i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        tokens.push(Number(tokenId));
      }
      return tokens;
    } catch (error) {
      console.error("Error fetching user NFTs:", error);
      return [];
    }
  }
}

export const contractService = new ContractService();
