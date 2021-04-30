// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./RFT.sol";
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

contract RFTFactory {
    address[]  public rfts;
    event NewRFT(address rft, address nft, uint tokenId, address creator);
    constructor() {}
    function createToken(string calldata name, 
    string calldata symbol, 
    address _nftAddress,
    uint _nftId,
    uint _icoSharePrice,
    uint _icoShareSupply,
    uint _icoShareReserve) external {
        IERC721 nft = IERC721(_nftAddress);
        require(msg.sender == nft.ownerOf(_nftId), "Only owner can create RFT");
        RFT rft = new RFT(name, symbol, _nftAddress, _nftId, _icoSharePrice, _icoShareSupply, _icoShareReserve);
        rft.transferOwnership(msg.sender);
        rfts.push(address(rft));
        emit NewRFT(address(rft), _nftAddress, _nftId, msg.sender);
    }

    function getRFTs() external view returns(address[] memory){
        return rfts;
    }
}