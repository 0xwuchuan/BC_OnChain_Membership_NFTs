// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";

import {LibString} from "solady/src/utils/LibString.sol";
import {NUSFintechieMetadata} from "../src/NUSFintechieMetadata.sol";
import {NUSFintechieRenderer} from "../src/NUSFintechieRenderer.sol";

contract RendererAndMetadataTest is Test {
    using LibString for string;

    /// @notice Generates the expected attributes from the given seed
    /// @dev only generates the attributes present in metadata (Refer to NUSFintechRenderer for more info)
    function generateExpectedAttributes(uint256 _seed, uint256 _department) internal pure returns (string memory) {
        NUSFintechieRenderer.Fintechie memory fintechie;

        _seed >>= 11;
        fintechie.inverted = _seed & 3 == 0;
        _seed >>= 2;
        fintechie.color = uint8(_seed % 6);

        string[] memory colors = string(NUSFintechieMetadata.COLORS).split("_");
        string[] memory hats = string(NUSFintechieMetadata.HATS).split("_");

        string memory hatStr = hats[_department];
        string memory colorStr = colors[fintechie.color];
        string memory invertedStr = fintechie.inverted ? "inverted" : "normal";

        return string.concat(
            '[{"trait_type": "hat", "value":"',
            hatStr,
            '"},',
            '{"trait_type": "color", "value":"',
            colorStr,
            '"},',
            '{"trait_type": "background", "value":"',
            invertedStr,
            '"}]'
        );
    }

    /// @dev expected output of generateAttributes is determine from hot-chain-svg repo
    /// (Not sure how to test this dynamically)
    function testGenerateAttributes(uint256 _seed, uint256 _department) public {
        // only 9 hats available
        vm.assume(_department < 9);

        string memory attributes = NUSFintechieMetadata.generateAttributes(_seed, _department);
        string memory expected = generateExpectedAttributes(_seed, _department);
        assertEq(attributes, expected);
    }
}
