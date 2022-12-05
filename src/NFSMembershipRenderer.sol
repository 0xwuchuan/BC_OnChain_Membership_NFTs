// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./SVG.sol";
import "./Utils.sol";
import "./LibString.sol";

// ON DEPLOY: Change to import from "solady/utils/LibString.sol";
// import "solady/utils/LibString.sol";

contract NFSMembershipRenderer {
    function render(
        uint256 tokenId,
        uint256 blockNumber,
        string memory department,
        string memory role,
        address owner
    ) public pure returns (string memory) {
        return
            string.concat(
                '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="336" fill="none">',
                generateBackground(),
                generateHeader(),
                generateBody(blockNumber, department, role),
                generateFooter(tokenId, owner),
                "</svg>"
            );
    }

    function generateBackground() public pure returns (string memory) {
        return
            svg.rect(
                string.concat(
                    // Background dynamic
                    svg.prop("fill", "#141D48"),
                    svg.prop("x", "0"),
                    svg.prop("y", "0"),
                    svg.prop("width", utils.uint2str(480)),
                    svg.prop("height", utils.uint2str(336)),
                    // Rounded Corners
                    svg.prop("rx", "20"),
                    svg.prop("ry", "20")
                ),
                utils.NULL
            );
    }

    // @dev Abstract out the header generation to prevent stack too deep error
    function generateHeader() public pure returns (string memory) {
        return
            string.concat(
                svg.text(
                    string.concat(
                        svg.prop("x", "35"),
                        svg.prop("y", "52"),
                        svg.prop("font-size", "30"),
                        svg.prop("font-family", "monospace"),
                        svg.prop("font-weight", "bold"),
                        svg.prop("fill", "#FFF")
                    ),
                    "Proof of Membership"
                ),
                svg.text(
                    string.concat(
                        svg.prop("x", "35"),
                        svg.prop("y", "83"),
                        svg.prop("font-size", "15"),
                        svg.prop("font-family", "monospace"),
                        svg.prop("fill", "#FFF")
                    ),
                    "NUS Fintech Society"
                ),
                svg.line(
                    string.concat(
                        svg.prop("x1", "35"),
                        svg.prop("y1", "101"),
                        svg.prop("x2", "449"),
                        svg.prop("y2", "101"),
                        svg.prop("stroke", "#FFF")
                    ),
                    utils.NULL
                )
            );
    }

    function generateBody(
        uint256 blockNumber,
        string memory department,
        string memory role
    ) public pure returns (string memory) {
        return
            string.concat(
                svg.text(
                    string.concat(
                        svg.prop("x", "35"),
                        svg.prop("y", "122"),
                        svg.prop("font-size", "10"),
                        svg.prop("font-family", "monospace"),
                        svg.prop("fill", "#FFF")
                    ),
                    string.concat(
                        "BLOCK FABRICATED: ",
                        utils.uint2str(blockNumber)
                    )
                ),
                svg.text(
                    string.concat(
                        svg.prop("x", "35"),
                        svg.prop("y", "170"),
                        svg.prop("font-weight", "bold"),
                        svg.prop("font-size", "20"),
                        svg.prop("font-family", "monospace"),
                        svg.prop("fill", "#FFF")
                    ),
                    string.concat("DIVISION: ", department)
                ),
                svg.text(
                    string.concat(
                        svg.prop("x", "35"),
                        svg.prop("y", "220"),
                        svg.prop("font-weight", "bold"),
                        svg.prop("font-size", "20"),
                        svg.prop("font-family", "monospace"),
                        svg.prop("fill", "#FFF")
                    ),
                    string.concat("ACCESS LEVEL: ", role)
                )
            );
    }

    function generateFooter(uint256 tokenId, address owner)
        public
        pure
        returns (string memory)
    {
        return
            string.concat(
                svg.text(
                    string.concat(
                        svg.prop("x", "35"),
                        svg.prop("y", "275"),
                        svg.prop("font-size", "10"),
                        svg.prop("font-family", "monospace"),
                        svg.prop("fill", "#FFF")
                    ),
                    LibString.toHexString(owner)
                ),
                generateBarCode(),
                svg.text(
                    string.concat(
                        svg.prop("x", "384"),
                        svg.prop("y", "309"),
                        svg.prop("font-size", "20"),
                        svg.prop("font-family", "monospace"),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.uint2str(tokenId)
                )
            );
    }

    // @dev Abstract out the barcode generation to prevent stack too deep error
    function generateBarCode() public pure returns (string memory) {
        return
            string.concat(
                svg.rect(
                    string.concat(
                        svg.prop("x", "35"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                ),
                svg.rect(
                    string.concat(
                        svg.prop("x", "63"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                ),
                svg.rect(
                    string.concat(
                        svg.prop("x", "91"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                ),
                svg.rect(
                    string.concat(
                        svg.prop("x", "119"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                ),
                svg.rect(
                    string.concat(
                        svg.prop("x", "147"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                ),
                svg.rect(
                    string.concat(
                        svg.prop("x", "175"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                ),
                svg.rect(
                    string.concat(
                        svg.prop("x", "203"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                ),
                svg.rect(
                    string.concat(
                        svg.prop("x", "231"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                ),
                svg.rect(
                    string.concat(
                        svg.prop("x", "259"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                ),
                svg.rect(
                    string.concat(
                        svg.prop("x", "287"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                ),
                svg.rect(
                    string.concat(
                        svg.prop("x", "315"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                ),
                svg.rect(
                    string.concat(
                        svg.prop("x", "343"),
                        svg.prop("y", "287"),
                        svg.prop("width", utils.uint2str(12)),
                        svg.prop("height", utils.uint2str(30)),
                        svg.prop("fill", "#FFF")
                    ),
                    utils.NULL
                )
            );
    }

    function example() external pure returns (string memory) {
        return
            render(
                10001,
                16117574,
                "BLOCKCHAIN",
                "DEVELOPER",
                0x777dcCD91f7C62717DBa44db3504bDf47C75E2F1
            );
    }
}
