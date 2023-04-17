const mongoose = require('mongoose');

// Configure MongoDB connection
const mongoURI = 'mongodb://localhost:27017/my_nft_database';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define schema for NFTs table
const nftSchema = new mongoose.Schema({
  tokenId: { type: Number, required: true },
  tokenUri: { type: String, required: true },
  owner: { type: String, required: true }
});

// Define schema for Transfers table
const transferSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  tokenId: { type: Number, required: true },
  txId: { type: String, required: true }
});

// Define models for NFTs and Transfers tables
const NFT = mongoose.model('NFT', nftSchema);
const Transfer = mongoose.model('Transfer', transferSchema);

// Function to store NFT data in the database
async function storeNFTData(tokenId, tokenUri, owner) {
  try {
    const nft = new NFT({ tokenId, tokenUri, owner });
    await nft.save();
    console.log(`NFT data stored in database: tokenId=${tokenId}, tokenUri=${tokenUri}, owner=${owner}`);
  } catch (err) {
    console.error('Error storing NFT data:', err);
  }
}

// Function to store transfer data in the database
async function storeTransferData(sender, recipient, tokenId, txId) {
  try {
    const transfer = new Transfer({ sender, recipient, tokenId, txId });
    await transfer.save();
    console.log(`Transfer data stored in database: sender=${sender}, recipient=${recipient}, tokenId=${tokenId}, txId=${txId}`);
  } catch (err) {
    console.error('Error storing transfer data:', err);
  }
}

// Call the storeNFTData and storeTransferData functions with some sample data
const tokenId = 123;
const tokenUri = 'https://example.com/nfts/123';
const owner = '0xabcdef123456';
storeNFTData(tokenId, tokenUri, owner);

const sender = '0xabcdef123456';
const recipient = '0x789ghi012345';
const transferTokenId = 123;
const txId = '0x123abc456def';
storeTransferData(sender, recipient, transferTokenId, txId);

// Close MongoDB connection when done
db.close();
