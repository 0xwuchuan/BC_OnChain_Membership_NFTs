// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library NUSFintechRenderer {

    /// @notice The traits that make up the art (Fintechie for now no idea what to name it)
    struct Fintechie {
        uint8 hat;
        uint8 head;
        uint8 eyes;
        uint8 mouth;
        uint8 hand;
        // bool inverted;
        // uint8 color;
    }
    
    /// @notice Hat characters for different traits (External Affairs, Internal Affairs, Presidential Cell, 
    /// Blockchain, Machine Learning, Software Development, Quant respectively
    /// @dev Index of 0 corresponds to no hat trait (Friend)
    bytes32 constant HATS = " +-*#@=$";

    bytes32 constant HEAD_LEFT = "|[({";
    bytes32 constant HEAD_RIGHT = "|])}";

    bytes32 constant EYES = "+-*#@=$^-0oxz";

    bytes32 constant HANDS = "/7DTYZ?>";
        
    bytes32 constant NUS = "SUN";
    bytes32 constant FINTECH = "HCETNIF";

    

    /// @notice Starting string for SVG
    /// @dev <style> tag contains a base64 encoded subsetted font file
    /// @dev <path> tag is the background of the SVG (Make dynamic in invert mode in future)
    string constant SVG_HEAD = 
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">'
        "<style>@font-face{font-family:A;src:url(data:font/woff2;charset=utf-8;base64,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)}</style>"
        '<path xmlns="http://www.w3.org/2000/svg" d="M0 0h600v600H0z" fill="#FFF"/>';

    function render(uint256 _seed) internal pure returns (string memory) {
        return "";
    }
}
