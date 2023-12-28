// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script, console2} from "forge-std/Script.sol";
import {NUSFintechies} from "../src/NUSFintechies.sol";
import {NUSFintechieRenderer} from "../src/NUSFintechieRenderer.sol";
import {NUSFintechieMetadata} from "../src/NUSFintechieMetadata.sol";

contract DeployNUSFintech is Script {
    address public immutable offchainSigner = 0xDF67f2dC7A1cbed09c0227C771fAa339E9f1A347;

    function run() external {
        vm.startBroadcast();

        NUSFintechieRenderer renderer = new NUSFintechieRenderer();
        NUSFintechieMetadata metadata = new NUSFintechieMetadata();
        NUSFintechies nusFintech = new NUSFintechies(address(renderer), address(metadata));

        nusFintech.setOffchainSigner(offchainSigner);

        vm.stopBroadcast();
    }
}
