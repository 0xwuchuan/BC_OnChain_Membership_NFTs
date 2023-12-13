// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {LibString} from "solady/src/utils/LibString.sol";

library NUSFintechMetadata {
    using LibString for string;
    using LibString for uint256;

    uint256 constant BITS_USED = 16;

    bytes constant HATS = 
        "none_external affairs_internal affairs_presidential cell_"
        "blockchain_machine learning_software development_quant_alumni";
    bytes constant COLORS = "blue_red_green_yellow_orange_purple";

    function generateAttributes(uint256 _seed, uint256 _department) internal pure returns(string memory) {
        string[] memory hats = string(HATS).split("_");
        string[] memory colors = string(COLORS).split("_");

        // The bits used to determine the background is [11, 13] (0-indexed)
        // Refer to NUSFintechRenderer.sol to confirm
        bool inverted = (_seed >> 11) & 3 == 0;

        // The bits used to determine the color/hue is [13, 16] (0-indexed)
        // Refer to NUSFintechRenderer.sol to confirm 
        uint256 color = (_seed >> 13) % 6;

        return 
            string.concat(
                '[{"trait_type": "hat", "value":"',
                hats[_department],
                '"},',
                '{"trait_type": "color", "value":"',
                colors[color],
                '"},',
                '{"trait_type": "background", "value":"',
                inverted ? "inverted" : "normal",
                '"}',
                ']'
            );
    }

}