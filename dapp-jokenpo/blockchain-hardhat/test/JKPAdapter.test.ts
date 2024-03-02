import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("JKPAdapter", function () {
 
  enum Options { NONE, ROCK, PAPER, SCISSORS }

  const DEFAULT_BID = ethers.parseEther("0.01");
  const DEFAULT_COMMISSION = 10n;

  async function deployFixture() {
    const [owner, player1, player2] = await ethers.getSigners();

    const JoKenPo = await ethers.getContractFactory("JoKenPo");
    const joKenPo = await JoKenPo.deploy();

    const JKPAdapter = await ethers.getContractFactory("JKPAdapter");
    const jKPAdapter = await JKPAdapter.deploy();

    return { joKenPo, jKPAdapter, owner, player1, player2 };
  }

  it("Should get implementation address", async function () {
    const { joKenPo, jKPAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

    const address = await joKenPo.getAddress();
    await jKPAdapter.upgrade(joKenPo);
    const implementationAddress = await jKPAdapter.getImplementationAddress();

    expect(address).to.equal(implementationAddress);
  });
  
  it("Should get bid", async function () {
    const { joKenPo, jKPAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

    await jKPAdapter.upgrade(joKenPo);

    const bid = await jKPAdapter.getBid();
    
    expect(bid).to.equal(DEFAULT_BID);
  });

  it("Should NOT get bid (upgrade)", async function () {
    const { joKenPo, jKPAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

    await expect(jKPAdapter.getBid()).to.be.revertedWith("You must upgrade first");
  });

  it("Should get commission", async function () {
    const { joKenPo, jKPAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

    await jKPAdapter.upgrade(joKenPo);

    const commission = await jKPAdapter.getCommission();
    
    expect(commission).to.equal(DEFAULT_COMMISSION);
  });
  
  it("Should NOT get commission (upgrade)", async function () {
    const { joKenPo, jKPAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

    await expect(jKPAdapter.getCommission()).to.be.revertedWith("You must upgrade first");
  });

  it("Should NOT upgrade (permission)", async function () {
    const { joKenPo, jKPAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

    const instance = jKPAdapter.connect(player1);

    await expect(instance.upgrade(joKenPo)).to.be.revertedWith("You do not have permission");
  });

  it("Should NOT upgrade (address)", async function () {
    const { joKenPo, jKPAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

    await expect(jKPAdapter.upgrade(ethers.ZeroAddress)).to.be.revertedWith("The address is required");
  });

  it("Should play alone by adapter", async function () {
    const { joKenPo, jKPAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

    await jKPAdapter.upgrade(joKenPo);

    const instance = jKPAdapter.connect(player1);
    await instance.play(Options.PAPER, {value: DEFAULT_BID});

    const result = await instance.getResult();
    
    expect(result).to.equal("Player 1 choose his/her option. Waiting player 2");
  });

  it("Should play along", async function () {
    const { joKenPo, jKPAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

    await jKPAdapter.upgrade(joKenPo);

    const instance = jKPAdapter.connect(player1);
    await instance.play(Options.PAPER, {value: DEFAULT_BID});

    const instance2 = jKPAdapter.connect(player2);
    await instance2.play(Options.ROCK, {value: DEFAULT_BID});

    const result = await instance.getResult();
    
    expect(result).to.equal("Paper wraps rock. Player 1 won.");
  });

});
