// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {svg} from "hot-chain-svg/SVG.sol";
import {LibString} from 'solady/src/utils/LibString.sol';

library NUSFintechRenderer {
    using LibString for uint256;

    /// @notice traits that make up the art (Fintechie for now no idea what to name it)
    struct Fintechie {
        uint8 hat;
        uint8 headleft;
        uint8 headright;
        uint8 eyes;
        uint8 hand;
        uint8 color;
        bool inverted;
    }
    
    /// @notice hat characters for different traits (Public, External Affairs, Internal Affairs, Presidential Cell, 
    /// Blockchain, Machine Learning, Software Development, Quant, Alumni respectively)
    /// @dev index of 0 corresponds to no hat trait (Friend of NFS)
    bytes32 constant HATS = " +-*#@=$^"; // 9 hats
    bytes32 constant HEAD_LEFT = "|[({"; // 4 heads
    bytes32 constant HEAD_RIGHT = "|])}"; // 4 heads
    bytes32 constant EYES = "+-*#@=$^-0oxz"; // 13 eyes
    bytes32 constant HANDS = "/7DTYZ?>"; // 8 hands

    // color  (hex)   (decimal)  (binary)                   << 8(unused) + 24 bits * index
    // ====================================================================================
    // blue   #3E7FED (04095981) (001111100111111111101101) << 32                  * 0
    // red    #B9474D (12142413) (101110010100011101001101) << 32                  * 1
    // green  #83C282 (08635010) (100000111100001010000010) << 32                  * 2
    // yellow #FDC63A (16631354) (111111011100011000111010) << 32                  * 3
    // orange #FD973A (16619322) (111111011001011100111010) << 32                  * 4
    // purple #B954F7 (12145911) (101110010101010011110111) << 32                  * 5
    uint256 constant COLORS = 0x3E7FED00B9474D0083C28200FDC63A00FD973A00B954F7;

    /// @notice base64 encoded subset of font
    string constant FONTSTR = "@font-face{font-family:A;src:url(data:font/woff2;charset=utf-8;base64,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)}";

    /// @notice background string behind fintechie
    /// @dev <a> tags are used to change color of text (declared in style tag later on)
    string constant BACKGROUNDSTR = 
        "<a>NUS</a>FINTECHSOCIETYNUSFIN\n"
        "TECHSOCIETYNUSFINTECHSO\n"
        "CIETYNUSFINTECHSOCIETYN\n"
        "USFINTECHSOCIETYNUSFINT\n"
        "ECHSOCIETYNUSFINTECHSOC\n"
        "IETYNUSFINTECHSOCIETYNU\n"
        "SFINTECHSOCIETYNUSFINTE\n"
        "CHSOCIETYNUSFINTECHSOCI\n"
        "ETYNUSFINTECHSOCIETYNUS\n"
        "FINTECHSOCIETYNUSFINTEC\n"
        "HSOCIETYNUSFINTECHSOCIE\n"
        "TYNUSFINTECHSOCIETYNUSF\n"
        "INTECHSOCIETYNUSFINTECH\n"
        "SOCIETYNUSFINTEC<a>FINTECH</a>\n";

    // @notice renders a FintechOnChain SVG 
    // @param _seed seed to select traits for Fintechie
    // @param department department of Fintechie
    // @dev department index is used to determine hat (0-indexed)
    // @returns SVG string representing Fintechie
    function render(uint256 _seed, uint256 _department) internal pure returns (string memory) {
        Fintechie memory fintechie;

        // Select characters for fintechie's different traits using bit manipulation
        fintechie.hat = uint8(_department); 
        // &(AND) with 3 (11 in binary - 2 bits) to choose from 4 heads
        fintechie.headleft = uint8(_seed & 3); 
        _seed >>= 2;
        // &(AND) with 3 (11 in binary - 2 bits) to choose from 4 heads
        fintechie.headright = uint8(_seed & 3); 
        _seed >>= 2;
        // %(MOD) with 13 (4 bits) to choose from 13 eyes (& cant work because 13 is not a power of 2)
        fintechie.eyes = uint8(_seed % 13); 
        _seed >>= 4;
        // &(AND) with 7 (111 in binary - 3 bits) to choose from 8 hands
        fintechie.hand = uint8(_seed & 7); 
        _seed >>= 3;
        // &(AND) with 3 (11 in binary - 2bits) for 25% chance of being inverted
        fintechie.inverted = _seed & 3 == 0; 
        _seed >>= 2;
        // %(MOD) with 6 (3 bits) to choose from 6 colors (& cant work because 6 is not a power of 2)
        fintechie.color = uint8(_seed % 6); 

        // Calculate hexadecimal color based on color index (fintechie.color)
        // >> (right shift) number of bits to get to the correct position of COLORS
        // fintechie.color << 5 is equivalent to fintechie.color * 32
        // & 0xFFFFFF to get the last 24 bits of COLORS
        string memory colorStr = string.concat(
            '#',
            ((COLORS >> (fintechie.color << 5)) & 0xFFFFFF).toHexStringNoPrefix()
        );

        // Concatenate all the traits into a string to form a fintechie
        // eg.     # 
        //     ( + . +)7
        string memory fintechieStr = string.concat(
            "    ",
            string(abi.encodePacked(HATS[fintechie.hat])),
            "    \n",
            string(abi.encodePacked(HEAD_LEFT[fintechie.headleft])),
            " ",
            string(abi.encodePacked(EYES[fintechie.eyes])),
            " . ",
            string(abi.encodePacked(EYES[fintechie.eyes])),
            string(abi.encodePacked(HEAD_RIGHT[fintechie.headright])),
            string(abi.encodePacked(HANDS[fintechie.hand]))
        );

        return
            string.concat(
                // start of svg tag
                '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">',
                // style tag that declares font and colors for the pre and a tags
                svg.el(
                    'style', '',
                    string.concat(
                        FONTSTR,
                        'pre{font-family:A;font-size:32px;text-align:center;margin:0;padding:0;letter-spacing:0.945px; }',
                        'a{color:rgba(0,0,0,0.5);}'
                    )
                ),
                // background rectangle that fills the entire svg (with color depending on inverted trait)
                svg.path(
                    string.concat(
                        svg.prop('xmlns', 'http://www.w3.org/2000/svg'),
                        svg.prop('d', 'M0 0h600v600H0z'),
                        svg.prop('fill', fintechie.inverted ? colorStr : '#FFF')
                    ), ''
                ),
                // foreignobject is used to wrap the pre tags so that they can be used in the svg
                svg.el(
                    'foreignObject',
                    string.concat(
                        svg.prop('x', '32'),
                        svg.prop('y', '20'),
                        svg.prop('width', '536'),
                        svg.prop('height', '561')
                    ),
                    string.concat(
                        svg.el(
                            'pre',
                            string.concat(
                                svg.prop('xmlns', 'http://www.w3.org/2000/svg'),
                                svg.prop('style', 'color:rgba(0,0,0,0.05)')
                            ),
                            BACKGROUNDSTR
                        )
                    )
                ),
                // foreignobject is used to wrap the pre tags so that they can be used in the svg
                svg.el(
                    'foreignObject',
                    string.concat(
                        svg.prop('x', '32'),
                        svg.prop('y', '187'),
                        svg.prop('width', '536'),
                        svg.prop('height', '200')
                    ),
                    string.concat(
                        svg.el(
                            'pre',
                            string.concat(
                                svg.prop('xmlns', 'http://www.w3.org/2000/svg'),
                                svg.prop('style', string.concat(
                                    'color:',
                                    fintechie.inverted ? '#FFF' : colorStr,
                                    ';font-size: 75px;'
                                ))
                            ),
                            fintechieStr
                        )
                    )
                ),
                '</svg>'
            );
    }
}
