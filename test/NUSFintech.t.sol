// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Test, console2} from "forge-std/Test.sol";
import {SignatureHelper} from "../script/SignatureHelper.sol";
import {NUSFintech, InvalidSignature, TokenDoesNotExist, TokenLocked} from "../src/NUSFintech.sol";

contract NUSFintechTest is Test {
    NUSFintech internal nusFintech;

    address internal user;
    address internal deployer;

    // Used for mint function
    uint256 constant DEPARTMENT = 0;
    bytes internal signature;

    function setUp() public {
        // Set internal variables
        user = vm.addr(0xB0B);
        deployer = address(0xD00D);

        uint256 signerPrivateKey = 0xA11CE;
        address signer = vm.addr(signerPrivateKey);
        signature = new SignatureHelper().generateSignature(signerPrivateKey, user, DEPARTMENT);

        vm.startPrank(deployer);

        nusFintech = new NUSFintech();
        nusFintech.setOffchainSigner(signer);

        vm.stopPrank();
    }

    function testNameAndSymbol() public {
        assertEq(nusFintech.name(), "NUSFintech", "Name is incorrect");
        assertEq(nusFintech.symbol(), "NFS", "Symbol is incorrect");
    }

    function testOwner() public {
        assertEq(nusFintech.owner(), deployer, "Owner is incorrect");
    }

    function test_RevertMintInvalidSignature() public {
        vm.expectRevert(InvalidSignature.selector);
        nusFintech.mint(0, "0x");
    }

    function testMint() public {
        vm.prank(user);
        nusFintech.mint(DEPARTMENT, signature);
        assertEq(nusFintech.balanceOf(user), 1);
    }

    function test_RevertTokenURITokenDoesNotExist() public {
        vm.expectRevert(TokenDoesNotExist.selector);
        nusFintech.tokenURI(0);
    }

    function test_RevertLockedTokenDoesNotExist() public {
        vm.expectRevert(TokenDoesNotExist.selector);
        nusFintech.locked(0);
    }

    function test_RevertApprove() public {
        vm.startPrank(user);
        nusFintech.mint(DEPARTMENT, signature);

        vm.expectRevert(TokenLocked.selector);
        nusFintech.approve(address(0xC0DE), 1);
        vm.stopPrank();
    }

    function test_RevertSetApprovalForAll() public {
        vm.startPrank(user);
        nusFintech.mint(DEPARTMENT, signature);

        vm.expectRevert(TokenLocked.selector);
        nusFintech.setApprovalForAll(address(0xC0DE), true);
        vm.stopPrank();
    }

    function test_RevertTransferFrom() public {
        vm.startPrank(user);
        nusFintech.mint(DEPARTMENT, signature);

        vm.expectRevert(TokenLocked.selector);
        nusFintech.transferFrom(user, address(0xC0DE), 1);
        vm.stopPrank();
    }

    function testSupportsERC5192Interface() public {
        assertEq(nusFintech.supportsInterface(0xb45a3c0e), true, "ERC5192 interface not supported");
    }

    function testSupportsERC721Interface() public {
        assertEq(nusFintech.supportsInterface(0x5b5e139f), true, "ERC721 interface not supported");
    }
}
