// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {ECDSA} from "solady/src/utils/ECDSA.sol";
import "forge-std/Test.sol";
import "../src/NUSFintech.sol";

contract NUSFintechTest is Test {
    using ECDSA for bytes32;

    NUSFintech private nusFintech;

    uint256 internal offchainSignerPrivateKey;
    uint256 internal userPrivateKey;
    address internal offchainSigner;
    address internal user;

    // Used for mint function
    uint256 constant DEPARTMENT = 0;
    bytes internal signature;

    function setUp() public {
        vm.startPrank(address(0xD00D));
        nusFintech = new NUSFintech();

        offchainSignerPrivateKey = 0xA11CE;
        userPrivateKey = 0xB0B;

        offchainSigner = vm.addr(offchainSignerPrivateKey);
        user = vm.addr(userPrivateKey);

        nusFintech.setOffchainSigner(offchainSigner);
        vm.stopPrank();

        bytes32 messageHash = keccak256(abi.encodePacked(user, DEPARTMENT))
            .toEthSignedMessageHash();

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            offchainSignerPrivateKey,
            messageHash
        );
        signature = abi.encodePacked(r, s, v);
    }

    function testNameAndSymbol() public {
        assertEq(nusFintech.name(), "NUSFintech", "Name is incorrect");
        assertEq(nusFintech.symbol(), "NFS", "Symbol is incorrect");
    }

    function testOwner() public {
        assertEq(nusFintech.owner(), address(0xD00D), "Owner is incorrect");
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
        assertEq(
            nusFintech.supportsInterface(0xb45a3c0e),
            true,
            "ERC5192 interface not supported"
        );
    }

    function testSupportsERC721Interface() public {
        assertEq(
            nusFintech.supportsInterface(0x5b5e139f),
            true,
            "ERC721 interface not supported"
        );
    }
}
