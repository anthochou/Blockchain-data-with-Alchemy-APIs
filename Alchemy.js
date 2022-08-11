import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "YOU API KEY HERE", // Replace with your Alchemy API Key. You can find in on your Alchemy dashboard.
  network: Network.ETH_MAINNET, 
};

const alchemy = new Alchemy(settings);

// Latest Ethereum block number
alchemy.core.getBlockNumber().then((res)=> {
  console.log('Last block number:');
  console.log(res);
});

// Gas price
alchemy.core.getGasPrice().then((res)=>{
  console.log('Gwei price:');
  console.log(JSON.parse(res)/Math.pow(10,9));
});

// FTM TOKEN METADATA
const metadata = await alchemy.core.getTokenMetadata(
    "0x4e15361fd6b4bb609fa63c81a2be19d873717870"
  );
console.log("FANTOM TOKEN METADATA");
console.log(metadata);

// Get transfers event on the blockchain: for a specific token or/and between block numbers, and/or from/to addresses.. 
// We can check the consistency of the transaction on https://etherscan.io/
const transfers = await alchemy.core.getAssetTransfers({
  fromBlock : 15319998, // recent block
  contractAddresses: ["0x4e15361fd6b4bb609fa63c81a2be19d873717870"], //FTM token
  category: ["external", "erc20", "erc721", "erc1155"],
  maxCount : 2 // Limits to 2 transfers only
}).then((res)=>{
  console.log("RANDOM FANTOM TRANSACTIONS :");
  console.log(res);
});

// NFT
// Who owns this famous Bored Ape Yacht Club NFT
const address = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const tokenId = 26;

// Get owner of NFT
const owner = await alchemy.nft.getOwnersForNft(address, tokenId);
console.log('Bored Ape Yacht Club NFT owner:');
console.log(owner);

// "Follow the smart money", the owner of an expensive NFT can have interesting holdings. We can use Debank to check the portofolio for example, or by using a dedicated API.
// Get all the token hold by the address
const ownerAddress = "0x0eeffea78e89a75f6baf1d345f16b185ee75a815";
const balances = await alchemy.core.getTokenBalances(ownerAddress);

// Filter our empty balances
const nonZeroBalances = balances.tokenBalances.filter((token) => {
  return token.tokenBalance !== "0x0000000000000000000000000000000000000000000000000000000000000000";
});

let i = 1;

// Loop over all tokens with non empty balance
for (let token of nonZeroBalances) {
  
  let balance = token.tokenBalance;
  
  // Get token name
  const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

  // convert hex to decimal
  balance = balance / Math.pow(10, metadata.decimals);
  balance = balance.toFixed(2);

  console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
}