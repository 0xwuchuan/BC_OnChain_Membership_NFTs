import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token", function () {
	it("Should return name Token", async function () {
		const Token = await ethers.getContractFactory("NFSMembership");
		const token = await Token.deploy();
		await token.deployed();
	});
});
