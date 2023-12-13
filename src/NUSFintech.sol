// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from "solmate/tokens/ERC721.sol";
import {IERC5192} from "ERC5192/src/IERC5192.sol";

error TokenLocked();
error TokenDoesNotExist();

contract NUSFintech is ERC721, IERC5192 {
    bool private immutable isLocked = true;

    constructor() ERC721("NUSFintech", "NFS") {}


    function tokenURI(uint256 _tokenid) public view override returns (string memory) {
        return "";
    }

    // =========================================================================
    // ERC5192 (Minimimal Soulbound NFTs) implementation
    // =========================================================================
    
    modifier checkLock() {
        if (isLocked) revert TokenLocked();
        _;
    }

    function locked(uint256 tokenId) external view returns (bool) {
        if (_ownerOf[tokenId] == address(0)) revert TokenDoesNotExist();
        return isLocked;
    }

    function transferFrom(
        address from, 
        address to, 
        uint256 id
    ) public override checkLock {
        super.transferFrom(from, to, id);
    }

    function safeTransferFrom(
        address from, 
        address to, 
        uint256 id
    ) public override checkLock {
        super.safeTransferFrom(from, to, id);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        bytes calldata data
    ) public override checkLock {
        super.safeTransferFrom(from, to, id, data);
    }

    function approve(address spender, uint256 id) public override checkLock {
        super.approve(spender, id);
    }

    function setApprovalForAll(address operator, bool approved) public override checkLock {
        super.setApprovalForAll(operator, approved);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC5192).interfaceId
        || super.supportsInterface(interfaceId);
    }
}
