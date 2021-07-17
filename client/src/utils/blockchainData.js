// import Web3 from "web3";
// import axios from "axios";
// import { getRFTAddressList } from "./rftFactoryContract";
// import { getNFTTokenDataInternal, getRFTData } from "./contractData";
// import { getDescription, getImage, getName } from "./tokenURIReader";
// import { createNFTObj, createNFTTokenObj, createRFTObj } from "./createObj";

// const erc721ABI = [
//   {
//     inputs: [],
//     name: "name",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [],
//     name: "symbol",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
//     name: "ownerOf",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
//     name: "tokenURI",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
// ];

// const getNFTData = async (nftContractAddress) => {
//   let web3 = new Web3(window.web3.currentProvider);
//   let nftc = new web3.eth.Contract(erc721ABI, nftContractAddress);
//   let namePromise = nftc.methods.name().call();
//   let symbolPromise = nftc.methods.symbol().call();
//   Promise.all([namePromise, symbolPromise]).then((values) => {
//     return createNFTObj(nftContractAddress, values[0], values[1]);
//   });
// };

// const getNFTTokenData = async (nftContractAddress, nftTokenId, rft) => {
//   let web3 = new Web3(window.web3.currentProvider);
//   let nftc = new web3.eth.Contract(erc721ABI, nftContractAddress);

//   // let owner = await nftc.methods.ownerOf(nftTokenId).call();
//   let owner = ""; //Optimization
//   let tokenURI = await nftc.methods.tokenURI(nftTokenId).call();

//   let name,
//     image,
//     description = "";
//   let tokenURIData = await axios.get(`/ipfs?iurl=${tokenURI}`);
//   if (tokenURIData) {
//     name = getName(tokenURIData.data);
//     description = getDescription(tokenURIData.data);
//     image = getImage(tokenURIData.data);
//   }

//   let nftTokenData = createNFTTokenObj(
//     nftContractAddress,
//     null,
//     null,
//     owner,
//     nftTokenId,
//     tokenURI,
//     name,
//     image,
//     description
//   );

//   nftTokenData.rft = rft;

//   return nftTokenData;
// };

// const getBlockchainData = async (rftEventHandlers, nftMap, nftTokenDataMap) => {
//   console.log("reading from blockchain");
//   let start = Date.now();
//   //getting internal nfts
//   let nftTokenDataListInternalPromise = getNFTTokenDataInternal();

//   //getting all rfts
//   let rftsPromise = getRFTAddressList().then((rftAddressList) =>
//     getRFTData(rftEventHandlers, rftAddressList)
//   );

//   return Promise.all([nftTokenDataListInternalPromise, rftsPromise]).then(
//     (values) => {
//       let nftTokenDataListInternal = values[0];
//       //Populating the nft map and the nftTokenData map with the internal nfts
//       for (let nftTokenData of nftTokenDataListInternal) {
//         //   nftTokenDataListInternal.forEach(async (nftTokenData) => {
//         nftTokenDataMap.set(
//           nftTokenData.nftContractAddress.toLowerCase() + nftTokenData.tokenId,
//           nftTokenData
//         );

//         // let nft = nftMap.get(nftTokenData.nftContractAddress);
//         // if (!nft) {
//         //   nft = await getNFTData(nftTokenData.nftContractAddress);
//         //   nftMap.set(nftTokenData.nftContractAddress, nft);
//         // }
//       }

//       let rfts = values[1];

//       //Populating nftTokens with rfts;
//       //if the nftToken is not available we first get it from the blockchain
//       //and then populate the nftToken with the rft
//       let nftTokenDataPromiseList = [];
//       for (let rft of rfts) {
//         //   rfts.forEach(async (rft) => {
//         // let nft = nftMap.get(rft.nftContractAddress);
//         // if (!nft) {
//         //   nft = await getNFTData(rft.nftContractAddress);
//         //   nftMap.set(rft.nftContractAddress, nft);
//         // }
//         let nftTokenData = nftTokenDataMap.get(
//           rft.nftContractAddress.toLowerCase() + rft.nftTokenId
//         );
//         if (!nftTokenData) {
//           let nftTokenDataPromise = getNFTTokenData(
//             rft.nftContractAddress,
//             rft.nftTokenId,
//             rft
//           );
//           nftTokenDataPromiseList.push(nftTokenDataPromise);
//         } else {
//           nftTokenData.rft = rft;
//           nftTokenDataMap.set(
//             rft.nftContractAddress.toLowerCase() + rft.nftTokenId,
//             nftTokenData
//           );
//         }
//       }

//       return Promise.all(nftTokenDataPromiseList).then((values) => {
//         for (let nftTokenData of values) {
//           nftTokenDataMap.set(
//             nftTokenData.rft.nftContractAddress.toLowerCase() +
//               nftTokenData.rft.nftTokenId,
//             nftTokenData
//           );
//         }
//         let end = Date.now();
//         console.log(`getBlockchainData Execution time: ${end - start} ms`);
//         return { nftMap, nftTokenDataMap };
//       });
//     }
//   );
// };

// export { getBlockchainData };
