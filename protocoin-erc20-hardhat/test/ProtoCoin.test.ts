import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ProtoCoin", function () {
  
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ProtoCoin = await ethers.getContractFactory("ProtoCoin");
    const protoCoin = await ProtoCoin.deploy();

    return { protoCoin, owner, otherAccount };
  }

  it("Should test", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);

    expect(true).to.equal(true);
  });

});
