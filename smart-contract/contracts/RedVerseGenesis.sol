// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RedVerseGenesis is ERC721, ERC2981, Ownable, Pausable, ReentrancyGuard {
    using Strings for uint256;

    uint256 public constant MAX_SUPPLY = 20;
    uint256 private _nextTokenId = 1; 
    string private _baseTokenURI;
    string private _contractURI;

    error MaximumSupplyReached();
    error WithdrawFailed();
    error InvalidURI();
    error ZeroBalance();

    event BaseURIUpdated(string newBaseURI);
    event ContractURIUpdated(string newContractURI);
    event Minted(address indexed to, uint256 indexed tokenId);
    event Withdrawn(address indexed to, uint256 amount);

    constructor()
        ERC721("RedVerse Genesis", "RVG")
        Ownable(msg.sender)
    {
        _setDefaultRoyalty(msg.sender, 500); // 5% royalty
    }

    receive() external payable {}

    function mint(address to) external onlyOwner whenNotPaused {
        if (_nextTokenId > MAX_SUPPLY) revert MaximumSupplyReached();

        uint256 tokenId = _nextTokenId;
        _safeMint(to, tokenId);
        
        emit Minted(to, tokenId);
        
        _nextTokenId++;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        bytes memory uriBytes = bytes(baseURI);
        if (uriBytes.length == 0) revert InvalidURI();
        if (uriBytes[uriBytes.length - 1] != bytes1("/")) revert InvalidURI();

        _baseTokenURI = baseURI;
        emit BaseURIUpdated(baseURI);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setContractURI(string memory newContractURI) external onlyOwner {
        if (bytes(newContractURI).length == 0) revert InvalidURI();
        
        _contractURI = newContractURI;
        emit ContractURIUpdated(newContractURI);
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        
        string memory paddedId = _padId(tokenId);
        
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, paddedId, ".json")) : "";
    }

    function _padId(uint256 id) internal pure returns (string memory) {
        if (id < 10) {
            return string(abi.encodePacked("00", id.toString()));
        } else if (id < 100) {
            return string(abi.encodePacked("0", id.toString()));
        } else {
            return id.toString();
        }
    }

    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        if (balance == 0) revert ZeroBalance();

        (bool success, ) = payable(owner()).call{value: balance}("");
        if (!success) revert WithdrawFailed();
        emit Withdrawn(owner(), balance);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        whenNotPaused
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function totalMinted() external view returns (uint256) {
        return _nextTokenId - 1;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}