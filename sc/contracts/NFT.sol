// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
// pragma experimental ABIEncoderV2;


import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public fees;

    event FeesUpdated(uint256 fees);
    event Minted(uint256 tokenId, address minter);
    event TokenURIUpdated(uint256 tokenId, address minter);
    event Burnt(uint256 tokenId, address minter);

    constructor(uint256 _fees) ERC721("RedFly", "RFT") {
        fees = _fees;
    }

    function setFees(uint256 _fees) external onlyOwner {
        fees = _fees;
        emit FeesUpdated(fees);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) external {
        require(msg.sender == ownerOf(tokenId), "Not owner of token");
        _setTokenURI(tokenId, _tokenURI);
        emit TokenURIUpdated(tokenId, msg.sender);
    }

    function mint(string memory _tokenURI) external payable{
        require(msg.value == fees);

        _tokenIds.increment();
        uint256 newNFTTokenId = _tokenIds.current();
        _mint(msg.sender, newNFTTokenId);
        _setTokenURI(newNFTTokenId, _tokenURI);

        emit Minted(newNFTTokenId, msg.sender);
    }

    function burn(uint tokenId) external {
        require(msg.sender == ownerOf(tokenId));
        _burn(tokenId);

        emit Burnt(tokenId, msg.sender);
    }

    function ownerTokens(address owner) view external returns(uint256[] memory, string[] memory){
        uint256 balanceOfOwner = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](balanceOfOwner);
        string[] memory tokenURIs = new string[](balanceOfOwner);
        for (uint i = 0; i < balanceOfOwner; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
            tokenURIs[i] = tokenURI(tokenIds[i]);

        }
        return (tokenIds, tokenURIs);
    }

    function allTokens() view external returns(uint256[] memory, string[] memory, address[] memory){
        uint256 totalSupply = totalSupply();
        uint256[] memory tokenIds = new uint256[](totalSupply);
        string[] memory tokenURIs = new string[](totalSupply);
        address[] memory owners = new address[](totalSupply);
        for (uint i = 0; i < totalSupply; i++) {
            tokenIds[i] = tokenByIndex(i);
            tokenURIs[i] = tokenURI(tokenIds[i]);
            owners[i] = ownerOf(tokenIds[i]);
        }
        return (tokenIds, tokenURIs, owners);
    }

    function withdraw() external onlyOwner payable{
        address payable wallet = payable(owner());
        wallet.transfer(address(this).balance);
    }    
    

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

}



