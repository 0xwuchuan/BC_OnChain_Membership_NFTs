// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/NFSMembershipRenderer.sol";

contract NFSMembershipRendererTest is Test {
    NFSMembershipRenderer t;

    function setUp() public {
        t = new NFSMembershipRenderer();
    }
}
