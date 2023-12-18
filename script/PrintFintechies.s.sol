// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script, console2} from "forge-std/Script.sol";
import {SignatureHelper} from "./SignatureHelper.sol";
import {NUSFintech} from "../src/NUSFintech.sol";

contract PrintFintechies is Script {
    NUSFintech internal nusFintech;

    function setUp() public {
        uint256 signerPrivateKey = 0xC0DE;
        address signer = vm.addr(signerPrivateKey);
        address user = vm.addr(0x1234);

        address deployer = address(0xD00D);
        vm.startPrank(deployer);

        nusFintech = new NUSFintech();
        nusFintech.setOffchainSigner(signer);

        vm.stopPrank();

        vm.startPrank(user);
        for (uint256 i = 0; i < 100;) {
            uint256 department = i % 9; // Department id is 0-8
            bytes memory sig = new SignatureHelper().generateSignature(signerPrivateKey, user, department);
            nusFintech.mint(department, sig);
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
