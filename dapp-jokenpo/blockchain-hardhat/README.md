# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts


npx hardhat run scripts/deploy.ts --network local

#Implementation deployed at 0x5067457698Fd6Fa1C6964e416b3f42713513B3dD
#Adapter deployed at 0x18E317A7D70d8fBf8e6E893616b52390EbBdb629
#Adapter was upgraded.

npx hardhat console
const [owner, player1, player2] = await ethers.getSigners();
const contract = await ethers.getContractAt("JKPAdapter", "0x18E317A7D70d8fBf8e6E893616b52390EbBdb629");
const instance1 = contract.connect(player1);
const instance2 = contract.connect(player2);
const DEFAULT_BID = ethers.parseEther("0.01");
await instance1.play(2, {value: DEFAULT_BID});
await contract.getResult();
await instance2.play(1, {value: DEFAULT_BID});
await contract.getResult();
await contract.getLeaderboard();

npx hardhat run scripts/deploy.ts --network sepolia

#Implementation deployed at 0xa514146E4831A3d1dEF8e2356AC50E2529baAD51
#Adapter deployed at 0x9664C31fC74621ca8203379A0304cbF664328Ce4
#Adapter was upgraded.

npx hardhat verify --network sepolia 0x9664C31fC74621ca8203379A0304cbF664328Ce4

#https://sepolia.etherscan.io/address/0x9664C31fC74621ca8203379A0304cbF664328Ce4#code

```
