// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script, console2} from "forge-std/Script.sol";
import {SignatureHelper} from "./SignatureHelper.sol";
import {NUSFintechies} from "../src/NUSFintechies.sol";
import {NUSFintechieRenderer} from "../src/NUSFintechieRenderer.sol";
import {NUSFintechieMetadata} from "../src/NUSFintechieMetadata.sol";

contract PrintFintechies is Script {
    NUSFintechies internal nusFintech;

    function setUp() public {
        uint256 signerPrivateKey = 0xC0DE;
        address signer = vm.addr(signerPrivateKey);
        address user = vm.addr(0x1234);

        address deployer = address(0xD00D);
        vm.startPrank(deployer);

        NUSFintechieRenderer renderer = new NUSFintechieRenderer();
        NUSFintechieMetadata metadata = new NUSFintechieMetadata();
        nusFintech = new NUSFintechies(address(renderer), address(metadata));
        nusFintech.setOffchainSigner(signer);

        vm.stopPrank();

        vm.startPrank(user);
        for (uint256 i = 0; i < 100;) {
            uint256 role = i % 9; // Department id is 0-8
            bytes memory sig = new SignatureHelper().generateSignature(signerPrivateKey, user, role);
            nusFintech.mint(role, sig);
            unchecked {
                ++i;
            }
        }
        vm.stopPrank();
    }

    function run() public view {
        // console2.log(nusFintech.tokenURI(1));
        for (uint256 i = 1; i < 15; i++) {
            console2.log(nusFintech.tokenURI(i));
        }
    }
}
