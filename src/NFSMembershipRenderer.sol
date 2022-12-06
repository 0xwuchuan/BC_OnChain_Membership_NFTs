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
                    // TODDO: BACKGROUND DYNAMIC PART OF TOKENID
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

    function generateBarCode() public pure returns (string memory) {
        // Interesting learning point: when declaring an array, the base type of
        // the array is the type of the first expression on the list such that all other expressions
        // can be implicitly converted to it.
        // https://docs.soliditylang.org/en/v0.8.17/types.html?highlight=array#array-literals
        uint256[6] memory firstHalf = [uint256(35), 63, 91, 119, 147, 175];
        uint256[6] memory secondHalf = [uint256(203), 231, 259, 287, 315, 343];
        return
            string.concat(
                generateBarcodeHalf(firstHalf),
                generateBarcodeHalf(secondHalf)
            );
    }

    // @dev Too many function arguments will result in a Compiler Error: Stack too deep
    // Hence, this function serves to split generateBarcode to reduce number of function arguments
    function generateBarcodeHalf(uint256[6] memory xCoordinates)
        public
        pure
        returns (string memory)
    {
        return
            string.concat(
                generateBarcodeRect(xCoordinates[0], 287),
                generateBarcodeRect(xCoordinates[1], 287),
                generateBarcodeRect(xCoordinates[2], 287),
                generateBarcodeRect(xCoordinates[3], 287),
                generateBarcodeRect(xCoordinates[4], 287),
                generateBarcodeRect(xCoordinates[5], 287)
            );
    }

    function generateBarcodeRect(uint256 x, uint256 y)
        public
        pure
        returns (string memory)
    {
        return
            svg.rect(
                string.concat(
                    svg.prop("x", utils.uint2str(x)),
                    svg.prop("y", utils.uint2str(y)),
                    svg.prop("width", utils.uint2str(12)),
                    svg.prop("height", utils.uint2str(30)),
                    svg.prop("fill", "#FFF")
                ),
                utils.NULL
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
