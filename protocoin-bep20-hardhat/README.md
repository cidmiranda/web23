# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

npx hardhat run scripts/deploy.ts --network local
Contract deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3
npx hardhat console
const contract = await ethers.getContractAt("ProtoCoin", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
await contract.approve("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", 1n * 10n ** 18n)

const [owner, otherAccount] = await ethers.getSigners();
const contractInstance = contract.connect(otherAccount);

await contractInstance.transferFrom("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x70997970C51812dc3A010C7d01b50e0d17dc79C8", 1n * 10n ** 18n)

npm i dotenv
npm i -D @nomiclabs/hardhat-etherscan 

npx hardhat run scripts/deploy.ts --network sepolia

npx hardhat run scripts/deploy.ts --network bsctest