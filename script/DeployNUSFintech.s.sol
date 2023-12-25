// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script, console2} from "forge-std/Script.sol";
import {NUSFintech} from "../src/NUSFintech.sol";

contract DeployNUSFintech is Script {
    function run() external {
        vm.startBroadcast();

        NUSFintech nusFintech = new NUSFintech();

        nusFintech.setOffchainSigner(0xDF67f2dC7A1cbed09c0227C771fAa339E9f1A347);

        vm.stopBroadcast();
    }
}
