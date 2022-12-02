// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/NFSMembership.sol";

contract NFSMembershipTest is Test {
    NFSMembership t;

    function setUp() public {
        t = new NFSMembership();
    }
}
