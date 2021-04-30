pragma solidity ^0.8.0;

import "./RFT.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract RFTFactory {
    address immutable tokenImplementation;

    constructor(address _tokenImplementation) public {
        tokenImplementation = _tokenImplementation;
    }

    function createToken(string calldata name, 
    string calldata symbol,
    address _nftAddress,
    uint _nftTokenId,
    uint _icoSharePrice,
    uint _icoShareSupply,
    address daiAddress) external returns (address) {
        address clone = Clones.clone(tokenImplementation);
        RFT(clone).initialize(name, 
        symbol, 
        _nftAddress, 
        _nftTokenId, 
        _icoSharePrice, 
        _icoShareSupply, 
        daiAddress);
        return clone;
    }
}