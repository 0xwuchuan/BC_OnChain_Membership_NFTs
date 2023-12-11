// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {LibString} from "solady/src/utils/LibString.sol";
import {NUSFintechMetadata} from "../src/utils/NUSFintechMetadata.sol";
import {NUSFintechRenderer} from "../src/utils/NUSFintechRenderer.sol";

contract RendererAndMetadataTest is Test {
    using LibString for string;

    function generateExpectedAttributes(uint256 _seed) internal pure returns (string memory){
        NUSFintechRenderer.Fintechie memory fintechie;

        _seed >>= 11;
        fintechie.inverted = _seed & 3 == 0; 
        _seed >>= 2;
        fintechie.color = uint8(_seed % 6); 

        string[] memory colors = string(NUSFintechMetadata.COLORS).split("_");
        string memory colorStr = colors[fintechie.color];

        string memory invertedStr = fintechie.inverted ? 'inverted' : 'normal';

        return string.concat(
            '[{"trait_type": "color", "value":"',
            colorStr,
            '"}',
            '{"trait_type": "background", "value":"',
            invertedStr,
            '"}',
            ']'
        );
    }

    /// @dev expected output of generateAttributes is determine from hot-chain-svg repo
    /// (Not sure how to test this dynamically)
    function testGenerateAttributes(uint256 _seed) public {
        string memory attributes = NUSFintechMetadata.generateAttributes(_seed);
        string memory expected = generateExpectedAttributes(_seed);
        assertEq(attributes, expected);
    }

}
