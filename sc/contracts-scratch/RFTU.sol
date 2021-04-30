// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

contract RFT is ERC20Upgradeable, OwnableUpgradeable{

    uint public icoSharePrice;
    uint public icoShareSupply;
    uint public icoEnd; 

    uint public nftTokenId;
    IERC721 public nft;
    IERC20 public dai;

    function initialize(string memory _name,
    string memory _symbol,
    address _nftAddress,
    uint _nftTokenId,
    uint _icoSharePrice,
    uint _icoShareSupply,
    address daiAddress) initializer public {
        __ERC20_init(_name, _symbol);
        __Ownable_init();
        nftTokenId = _nftTokenId;
        nft = IERC721(_nftAddress);
        dai = IERC20(daiAddress);
        icoSharePrice = _icoSharePrice;
        icoShareSupply = _icoShareSupply;
    }

    function startIco(uint _days) external onlyOwner {
        // nft.transferFrom(msg.sender, address(this), nftTokenId);
        icoEnd = block.timestamp + _days * 86400;
    }

    function buyShare(uint shareAmount) external {
        require(icoEnd > 0, "ICO has not started");
        require(block.timestamp <= icoEnd, "ICO is over");
        require(totalSupply() + shareAmount <= icoShareSupply, "Not enough shares left");
        uint daiAmount = shareAmount * icoSharePrice;
        dai.transferFrom(msg.sender, address(this), daiAmount);
        _mint(msg.sender, shareAmount);
    }

    function withdraw() external onlyOwner{
        require(msg.sender == owner(), "Only admin can withdraw");
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

    function getBalanceDai() public view returns(uint256){
        return dai.balanceOf(address(this));
    }

}
