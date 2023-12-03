// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from "solmate/tokens/ERC721.sol";
import {Ownable} from "solady/auth/Ownable.sol";
//import {Base64} from "solady/utils/Base64.sol";

error NonExistentToken();

contract NUSFintech is ERC721, Ownable {
    // Token Id -> block minted
    mapping(uint256 => uint256) public blockMinted;

    constructor() ERC721("NFS Membership", "NFSM") {}

    function mint(address to, uint256 tokenId, bytes calldata signature) public onlyOwner {
        _mint(to, tokenId);
    }

    // function tokenURI(uint256 id,
    //     uint256 mintedBlock,
    //     string memory department,
    //     string memory role,
    //     address owner) public view returns (string memory) {
    //     if (ownerOf(id) == address(0)) {
    //         revert NonExistentToken();
    //     }
    //     //link to renderer
    //     //return new NFSMembershipRenderer().render(id, mintedBlock, department, role, owner);
    //     return string(abi.encode(id));
    
    // }

    function tokenURI(uint256 id) public view override returns (string memory) {
        if (ownerOf(id) == address(0)) {
            revert NonExistentToken();
        }
        //link to renderer
        return string(abi.encode(id));
    } 

    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        
        if(from != address(0)){
            revert('cannot transfer ownership');
        }
        super.transferFrom(from, to, tokenId);
    } 

    
}
