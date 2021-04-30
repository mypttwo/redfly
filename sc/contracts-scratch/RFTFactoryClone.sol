pragma solidity ^0.8.0;

import "RFTU.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract FactoryClone {
    address immutable tokenImplementation;

    constructor(address _tokenImplementation) public {
        tokenImplementation = _tokenImplementation;
    }

    function createToken(string calldata name, 
    string calldata symbol,
    address calldata _nftAddress,
    uint calldata _nftTokenId,
    uint calldata _icoSharePrice,
    uint calldata _icoShareSupply,
    address calldata daiAddress) external returns (address) {
        address clone = Clones.clone(tokenImplementation);
        RFTU(clone).initialize(name, symbol, _nftAddress, _nftTokenId, _icoSharePrice, _icoShareSupply, '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa');
        return clone;
    }
}