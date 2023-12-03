// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/NUSFintech.sol";

contract NUSFintechTest is Test {
    NUSFintech t;

    function setUp() public {
        t = new NUSFintech();
    }
}
