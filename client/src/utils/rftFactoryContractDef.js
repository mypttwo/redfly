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
    constant: true,
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
    constant: true,
  },
];
const address = "0x26E20Ea5F8adaB5F88E3Da7668098e2D3dcB0acB";
export { address, abi };
