import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { NUSFintech } from "../typechain-types";

describe("NUSFintech", function () {
  let nusFintech: NUSFintech, ownerAddress: string;

  before("Deploy NUSFintech.sol", async function () {
    nusFintech = await ethers.deployContract("NUSFintech");

    let [owner] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
  });

  it("Should assign deployer as owner", async function () {
    assert.equal(await nusFintech.owner(), ownerAddress);
  });
});
