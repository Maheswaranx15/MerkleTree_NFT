// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  let name = 'PokPok'
  let symbol = 'PkPknft'
  let hash = '0x1b0db6d03427e699f02df2bb95d45806c5160101b638027b76416c263b95a21c'
  let BaseURI = 'https://ipfs.io/ipfs/QmQwa9yTQRCJ3TsU2qkZywwphAhDXWsaWN2j53daLs3S3p/'
  const Contract = await hre.ethers.getContractFactory("pokpok");
  const contract = await Contract.deploy(name,symbol,BaseURI,hash,hash,1710763988);
  await contract.deployed();

  console.log(
    `contract deployment address`, contract.address
  );


  const Contractdata = {
    address: contract.address,
    abi: JSON.parse(contract.interface.format('json'))
  }

  fs.writeFileSync('./contract.json', JSON.stringify(Contractdata))

  //Verify the smart contract using hardhat 
  await hre.run("verify:verify", {
    address: contract.address,
  });

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});