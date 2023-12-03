// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from "solmate/tokens/ERC721.sol";

contract NUSFintech is ERC721 {

    constructor() ERC721("NUSFintech", "NFS") {}

    function tokenURI(uint256 _tokenid) public view override returns (string memory) {
        return "";
    }
}
