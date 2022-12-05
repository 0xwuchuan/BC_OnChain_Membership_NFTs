// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./SVG.sol";
import "./Utils.sol";

// @dev
contract NFSMembershipRenderer {
    function render(uint256 _tokenId) public pure returns (string memory) {
        return (
            string.concat(
                '<svg xmlns="http://www.w3.org/2000/svg" width="490" height="490" style="background:#000">',
                svg.text(
                    string.concat(
                        svg.prop("x", "20"),
                        svg.prop("y", "40"),
                        svg.prop("font-size", "22"),
                        svg.prop("fill", "white")
                    ),
                    string.concat(
                        svg.cdata("Hello, token #"),
                        utils.uint2str(_tokenId)
                    )
                ),
                svg.rect(
                    string.concat(
                        svg.prop("fill", "purple"),
                        svg.prop("x", "20"),
                        svg.prop("y", "50"),
                        svg.prop("width", utils.uint2str(160)),
                        svg.prop("height", utils.uint2str(10))
                    ),
                    utils.NULL
                ),
                "</svg>"
            )
        );
    }
}
