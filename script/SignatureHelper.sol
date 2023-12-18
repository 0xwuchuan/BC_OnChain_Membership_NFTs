// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ECDSA} from "solady/src/utils/ECDSA.sol";
import {Script} from "forge-std/Script.sol";

contract SignatureHelper is Script {
    using ECDSA for bytes32;

    function generateSignature(uint256 signerPrivateKey, address userMinting, uint256 department)
        external
        pure
        returns (bytes memory)
    {
        bytes32 messageHash = keccak256(abi.encodePacked(userMinting, department)).toEthSignedMessageHash();

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPrivateKey, messageHash);
        bytes memory signature = abi.encodePacked(r, s, v);
        return signature;
    }
}
