const NFT = artifacts.require("./NFT.sol");
const RFTFactory = artifacts.require("./RFTFactory.sol");

module.exports = function (deployer) {
  deployer.deploy(NFT, "0000000000");
  deployer.deploy(RFTFactory);
};
