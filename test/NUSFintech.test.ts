import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("NUSFintech", function () {
  let nusFintech: any, owner: any;

  before("Deploy NUSFintech.sol", async function () {
    const NUSFintech = await ethers.getContractFactory("NUSFintech");
    nusFintech = await NUSFintech.deploy();
    await nusFintech.deployed();

    [owner] = await ethers.provider.listAccounts();
  });
});
