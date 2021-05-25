import { rftFactoryContractAddress } from "../config";

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "rft", type: "address" },
      { indexed: false, internalType: "address", name: "nft", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "NewRFT",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "rfts",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "address", name: "_nftAddress", type: "address" },
      { internalType: "uint256", name: "_nftId", type: "uint256" },
      { internalType: "uint256", name: "_icoSharePrice", type: "uint256" },
      { internalType: "uint256", name: "_icoShareSupply", type: "uint256" },
      { internalType: "uint256", name: "_icoShareReserve", type: "uint256" },
    ],
    name: "createToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getRFTs",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
];

// const address = "0x723cF2EC22cbf503f02b0EB8E330Eb8dD115a7Cb";

const address = rftFactoryContractAddress;
export { address, abi };
