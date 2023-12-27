// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC721} from "solmate/tokens/ERC721.sol";
import {IERC5192} from "ERC5192/src/IERC5192.sol";
import {ECDSA} from "solady/src/utils/ECDSA.sol";
import {Owned} from "solmate/auth/Owned.sol";
import {Base64} from "solady/src/utils/Base64.sol";
import {NUSFintechieRenderer} from "./NUSFintechieRenderer.sol";
import {NUSFintechieMetadata} from "./NUSFintechieMetadata.sol";

error TokenLocked();
error TokenDoesNotExist();
error InvalidSignature();

contract NUSFintech is ERC721, IERC5192, Owned {
    using ECDSA for bytes32;

    string constant COLLECTION_DESCRIPTION = "Commemorate your role in the NUS Fintech Society with "
        "a unique Fintechie that lives on-chain as a soulbound NFT.\\n\\n"
        "Fintechies represent your membership and involvement with the society, "
        "forever enshrined on the blockchain.\\n\\n Friends of "
        "the society can also mint your own Fintechie to show your support.";

    // Soulbound NFT is locked by default
    bool private immutable isLocked = true;

    // Address of offchain signer of mint signature
    address private _offchainSigner;

    // Next token id to be minted
    uint256 private _currentIndex = 1;

    // Mapping from token id to department id
    // Refer to NUSFintechRenderer for more on department id
    mapping(uint256 => uint256) private _departments;

    constructor() ERC721("NUSFintechies", "NUS") Owned(msg.sender) {}

    /// @notice Mints a new NFT with the given department id
    /// @dev Store department id in _departments mapping for use in tokenURI function
    /// @param department department id of nft to be minted (0-8) inclusive
    /// @param _signature signature of mint request
    function mint(uint256 department, bytes calldata _signature) external {
        if (!_verifySignature(department, _signature)) {
            revert InvalidSignature();
        }

        _departments[_currentIndex] = department;
        _mint(msg.sender, _currentIndex);
        emit Locked(_currentIndex);
        ++_currentIndex;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        if (_ownerOf[_tokenId] == address(0)) revert TokenDoesNotExist();

        uint256 seed = uint256(keccak256(abi.encodePacked(_tokenId)));
        uint256 department = _departments[_tokenId];

        string memory name = NUSFintechieMetadata.generateName(seed, department);
        string memory attributes = NUSFintechieMetadata.generateAttributes(seed, department);

        return string.concat(
            "data:application/json;base64,",
            Base64.encode(
                abi.encodePacked(
                    '{"name":"',
                    name,
                    '", "description":"',
                    COLLECTION_DESCRIPTION,
                    '", "image_data":"data:image/svg+xml;base64,',
                    Base64.encode(abi.encodePacked(NUSFintechieRenderer.render(seed, department))),
                    '", "attributes":',
                    attributes,
                    "}"
                )
            )
        );
    }

    function contractURI() public pure returns (string memory) {
        return string.concat(
            "data:application/json;base64,",
            Base64.encode(
                abi.encodePacked('{"name":"', "NUS Fintechies", '", "description":"', COLLECTION_DESCRIPTION, '"}')
            )
        );
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

    function transferFrom(address from, address to, uint256 id) public override checkLock {
        super.transferFrom(from, to, id);
    }

    function approve(address spender, uint256 id) public override checkLock {
        super.approve(spender, id);
    }

    function setApprovalForAll(address operator, bool approved) public override checkLock {
        super.setApprovalForAll(operator, approved);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC5192).interfaceId || super.supportsInterface(interfaceId);
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
    function _verifySignature(uint256 department, bytes memory _signature) private view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, department));

        address signer = messageHash.toEthSignedMessageHash().recover(_signature);

        return signer == _offchainSigner;
    }
}
