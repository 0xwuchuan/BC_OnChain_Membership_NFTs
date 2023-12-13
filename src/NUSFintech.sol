// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC721} from "solmate/tokens/ERC721.sol";
import {IERC5192} from "ERC5192/src/IERC5192.sol";
import {ECDSA} from "solady/src/utils/ECDSA.sol";
import {Owned} from "solmate/auth/Owned.sol";

error TokenLocked();
error TokenDoesNotExist();
error InvalidSignature();

contract NUSFintech is ERC721, IERC5192, Owned {
    using ECDSA for bytes32;

    // Soulbound NFT is locked by default
    bool private immutable isLocked = true;

    // Address of offchain signer of mint signature
    address private _offchainSigner;

    // Next token id to be minted
    uint256 private _currentIndex;

    // Mapping from token id to department id
    // Refer to NUSFintechRenderer for more on department id
    mapping(uint256 => uint256) private _departments;

    constructor() ERC721("NUSFintech", "NFS") Owned(msg.sender) {}

    /// @notice Mints a new NFT with the given department id
    /// @dev Store department id in _departments mapping for use in tokenURI function
    /// @param department department id of nft to be minted
    /// @param _signature signature of mint request
    function mint(uint256 department, bytes calldata _signature) external {
        if (!_verifySignature(department, _signature))
            revert InvalidSignature();

        _departments[_currentIndex] = department;
        _mint(msg.sender, _currentIndex);
        ++_currentIndex;
    }

    function tokenURI(
        uint256 _tokenid
    ) public view override returns (string memory) {
        return "";
    }

    // =========================================================================
    // ERC5192 (Minimimal Soulbound NFTs) Implementation
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

    function setApprovalForAll(
        address operator,
        bool approved
    ) public override checkLock {
        super.setApprovalForAll(operator, approved);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return
            interfaceId == type(IERC5192).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    // =========================================================================
    // Ownable Functions
    // =========================================================================
    function setOffchainSigner(address _signer) external onlyOwner {
        _offchainSigner = _signer;
    }

    // =========================================================================
    // Private/Helper Functions
    // =========================================================================

    /// @dev Verify signature by recreating message hash that we signed on client side
    /// then using that to recover the address that signed the signature
    /// @param department department id of nft to be minted
    /// @param _signature signature of mint request
    /// @return true if signature is valid, false otherwise
    function _verifySignature(
        uint256 department,
        bytes memory _signature
    ) private view returns (bool) {
        bytes32 messageHash = keccak256(
            abi.encodePacked(msg.sender, department)
        );

        address signer = messageHash.toEthSignedMessageHash().recover(
            _signature
        );

        return signer == _offchainSigner;
    }
}
