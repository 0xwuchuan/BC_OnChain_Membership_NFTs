import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { NUSFintech } from "../typechain-types";
import { describe } from "mocha";
import { Signer } from "ethers";
import signWhitelist from "./test-helpers";

describe("NUSFintech", function () {
  let nusFintech: NUSFintech, owner: Signer, ownerAddress: string;
  let user1: Signer, user2: Signer;
  let user1Address: string, user2Address: string;

  before("Deploy NUSFintech.sol", async function () {
    nusFintech = await ethers.deployContract("NUSFintech");

    [owner, user1, user2] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
    user1Address = await user1.getAddress();
    user2Address = await user2.getAddress();
  });

  describe("Deployment", function () {
    it("Should assign correct name and symbol", async function () {
      assert.equal(await nusFintech.name(), "NUSFintech");
      assert.equal(await nusFintech.symbol(), "NFS");
    });

    it("Should assign deployer as owner", async function () {
      console.log(`ownerAddress: ${ownerAddress}`);
      assert.equal(await nusFintech.owner(), ownerAddress);
    });
  });

  describe("Mint", function () {
    let department = 0;

    before("Set offchain signing address", async function () {
      await nusFintech.setOffchainSigner(ownerAddress);
    });

    it("Should revert with invalid signature for mint function", async function () {
      await expect(
        nusFintech.mint(department, "0x")
      ).to.be.revertedWithCustomError(nusFintech, "InvalidSignature");
    });

    it("Should accept mint with valid signature", async function () {
      let sig = await signWhitelist(department, owner, user1Address);

      await expect(nusFintech.connect(user1).mint(department, sig))
        .to.emit(nusFintech, "Transfer")
        .withArgs(ethers.ZeroAddress, user1Address, 1);
    });
  });
});
