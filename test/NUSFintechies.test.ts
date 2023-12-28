import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { NUSFintechies } from "../typechain-types";
import { describe } from "mocha";
import { Signer } from "ethers";
import signWhitelist from "./test-helpers";

describe("NUSFintechies", function () {
  let nusFintech: NUSFintechies, owner: Signer, ownerAddress: string;
  let user1: Signer, user2: Signer;
  let user1Address: string, user2Address: string;

  before(
    "Deploy NUSFintech.sol and set offchain signing address",
    async function () {
      const renderer = await ethers.deployContract("NUSFintechieRenderer");
      const metadata = await ethers.deployContract("NUSFintechieMetadata");

      const nusFintechConstructorArguments = [
        renderer.getAddress(),
        metadata.getAddress(),
      ];

      nusFintech = await ethers.deployContract(
        "NUSFintechies",
        nusFintechConstructorArguments
      );

      [owner, user1, user2] = await ethers.getSigners();
      ownerAddress = await owner.getAddress();
      user1Address = await user1.getAddress();
      user2Address = await user2.getAddress();

      await nusFintech.setOffchainSigner(ownerAddress);
    }
  );

  describe("Deployment", function () {
    it("Should assign correct name and symbol", async function () {
      assert.equal(await nusFintech.name(), "NUSFintechies");
      assert.equal(await nusFintech.symbol(), "NUS");
    });

    it("Should assign deployer as owner", async function () {
      assert.equal(await nusFintech.owner(), ownerAddress);
    });
  });

  describe("Mint", function () {
    let department = 0;

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

  describe("tokenURI", function () {
    it("Should revert on non existent tokenId", async function () {
      await expect(nusFintech.tokenURI(2)).to.be.revertedWithCustomError(
        nusFintech,
        "TokenDoesNotExist"
      );
    });
  });

  describe("Soulbound Functionality", function () {
    // @dev Contract state is presists between describe blocks because
    // nusFintech(contract) is declared outside of the describe blocks
    it("Should revert when checking lock status of non existent tokenId", async function () {
      await expect(nusFintech.locked(2)).to.be.revertedWithCustomError(
        nusFintech,
        "TokenDoesNotExist"
      );
    });

    it("Should revert on attempted call on approve()", async function () {
      await expect(
        nusFintech.connect(user1).approve(user2Address, 1)
      ).to.be.revertedWithCustomError(nusFintech, "TokenLocked");
    });

    it("Should revert on attempted setApprovalForAll()", async function () {
      await expect(
        nusFintech.connect(user1).setApprovalForAll(user2Address, true)
      ).to.be.revertedWithCustomError(nusFintech, "TokenLocked");
    });

    it("Should revert on attempted call on transferFrom()", async function () {
      await expect(
        nusFintech.connect(user1).transferFrom(user1Address, user2Address, 1)
      ).to.be.revertedWithCustomError(nusFintech, "TokenLocked");
    });

    it("Should support ERC5192 interface", async function () {
      expect((await nusFintech.supportsInterface("0xb45a3c0e")) == true);
    });

    it("Should support ERC721 interface", async function () {
      expect((await nusFintech.supportsInterface("0x5b5e139f")) == true);
    });
  });
});
