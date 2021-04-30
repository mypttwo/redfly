// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RFT is ERC20, Ownable{

    uint public icoSharePrice;
    uint public icoShareSupply;
    uint public icoShareReserve;
    uint public icoEnd; 

    uint public nftTokenId;
    IERC721 public nft;

    IERC20 public dai;

    event Bought(address nftAddress, uint tokenId, address rftAddress, string name, string symbol, address buyerAddress, uint shareAmount);
    event ICOStarted(address nftAddress, uint tokenId, address rftAddress, string name, string symbol, uint icoSharePrice, uint icoShareSupply, uint icoShareReserve, uint icoEnd, address owner);

    constructor(string memory _name,
    string memory _symbol,
    address _nftAddress,
    uint _nftTokenId,
    uint _icoSharePrice,
    uint _icoShareSupply,
    uint _icoShareReserve) 
    ERC20 (_name, _symbol){
        nftTokenId = _nftTokenId;
        nft = IERC721(_nftAddress);
        address daiAddress = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;
        dai = IERC20(daiAddress);
        icoSharePrice = _icoSharePrice;
        icoShareSupply = _icoShareSupply;
        icoShareReserve = _icoShareReserve;
    }

    function startIco(uint _days) external onlyOwner{
        nft.transferFrom(msg.sender, address(this), nftTokenId);
        icoEnd = block.timestamp + _days * 86400;
        emit ICOStarted(address(nft), nftTokenId, address(this), name(), symbol(), icoSharePrice, icoShareSupply, icoShareReserve, icoEnd, owner() );
    }

    function buyShare(uint shareAmount) external {
        require(icoEnd > 0, "ICO has not started");
        require(block.timestamp <= icoEnd, "ICO is over");
        require(totalSupply() + icoShareReserve + shareAmount <= icoShareSupply, "Not enough shares left");
        uint daiAmount = shareAmount * icoSharePrice;
        dai.transferFrom(msg.sender, address(this), daiAmount);
        _mint(msg.sender, shareAmount);
        emit Bought(address(nft), nftTokenId, address(this), name(), symbol(), msg.sender, shareAmount);
    }

    function getData() external view returns (address , uint , address , string memory, string memory, uint , uint , uint, uint, address, uint){
        return (address(nft), nftTokenId, address(this), name(), symbol(), icoSharePrice, icoShareSupply, icoShareReserve, icoEnd, owner(), balanceOf(msg.sender));
    }

    function withdraw() external onlyOwner {
        require(block.timestamp > icoEnd, "ICO in progress");
        uint daiBalance = dai.balanceOf(address(this));
        if(daiBalance > 0){
            dai.transfer(owner(), daiBalance);
        }
        uint unsoldShares = icoShareSupply - totalSupply();
        if(unsoldShares > 0) {
            _mint(owner(), unsoldShares);
        }
    }

}
