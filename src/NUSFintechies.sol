// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC721} from "solmate/tokens/ERC721.sol";
import {IERC5192} from "ERC5192/src/IERC5192.sol";
import {ECDSA} from "solady/src/utils/ECDSA.sol";
import {Owned} from "solmate/auth/Owned.sol";
import {Base64} from "solady/src/utils/Base64.sol";
import {INUSFintechieRenderer} from "./interfaces/INUSFintechieRenderer.sol";
import {INUSFintechieMetadata} from "./interfaces/INUSFintechieMetadata.sol";

error TokenLocked();
error TokenDoesNotExist();
error InvalidSignature();
error MintNotActive();

contract NUSFintechies is ERC721, IERC5192, Owned {
    using ECDSA for bytes32;

    /// @notice Renderer contract for generating images (SVGs)
    address public rendererAddress;

    /// @notice Metadata contract for generating metadata (name, attributes, contract info)
    address public metadataAddress;

    /// @notice Variable for soulbound functionality
    /// @dev Soulbound from mint so isLocked is immutable
    bool private immutable isLocked = true;

    /// @notice Address of offchain signer of mint signature
    /// @dev Set by owner and should be the same client side
    address private _offchainSigner;

    /// @notice Next token id to be minted
    uint256 private _currentIndex = 1;

    /// @notice Mapping from token id to role
    /// @dev Refer to NUSFintechieRenderer for more on roles
    mapping(uint256 => uint256) private _roles;

    constructor(address _rendererAddress, address _metadataAddress) ERC721("NUSFintechies", "NUS") Owned(msg.sender) {
        rendererAddress = _rendererAddress;
        metadataAddress = _metadataAddress;
    }

    /// @notice Mints a new NFT with the given role
    /// @dev Store role id in roles mapping for use in tokenURI function
    /// @param _role role of nft to be minted (0-8 inclusive)
    /// @param _signature signature of mint request
    function mint(uint256 _role, bytes calldata _signature) external {
        if (!_verifySignature(_role, _signature)) {
            revert InvalidSignature();
        }

        _roles[_currentIndex] = _role;
        _mint(msg.sender, _currentIndex);
        emit Locked(_currentIndex);
        ++_currentIndex;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        if (_ownerOf[_tokenId] == address(0)) revert TokenDoesNotExist();

        uint256 seed = uint256(keccak256(abi.encodePacked(_tokenId)));
        uint256 role = _roles[_tokenId];

        INUSFintechieMetadata metadata = INUSFintechieMetadata(metadataAddress);
        string memory name = metadata.generateName(seed, role);
        string memory attributes = metadata.generateAttributes(seed, role);
        string memory collectionDescription = metadata.collectionDescription();

        INUSFintechieRenderer renderer = INUSFintechieRenderer(rendererAddress);
        return string.concat(
            "data:application/json;base64,",
            Base64.encode(
                abi.encodePacked(
                    '{"name":"',
                    name,
                    '", "description":"',
                    collectionDescription,
                    '", "image_data":"data:image/svg+xml;base64,',
                    Base64.encode(abi.encodePacked(renderer.render(seed, role))),
                    '", "attributes":',
                    attributes,
                    "}"
                )
            )
        );
    }

    function contractURI() public view returns (string memory) {
        INUSFintechieMetadata metadata = INUSFintechieMetadata(metadataAddress);
        string memory collectionDescription = metadata.collectionDescription();

        return string.concat(
            "data:application/json;base64,",
            Base64.encode(
                abi.encodePacked('{"name":"', "NUS Fintechies", '", "description":"', collectionDescription, '"}')
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
    /// @notice Set address of offchain signer
    /// @dev offchain signer should be the same for client side
    /// @param _signer address of offchain signer
    function setOffchainSigner(address _signer) external onlyOwner {
        _offchainSigner = _signer;
    }

    /// @notice Set address of renderer contract
    /// @dev Renderer contract should implement INUSFintechieRenderer interface
    /// @param _rendererAddress address of renderer contract
    function setRendererAddress(address _rendererAddress) external onlyOwner {
        rendererAddress = _rendererAddress;
    }

    /// @notice Set address of metadata contract
    /// @dev Metadata contract should implement INUSFintechieMetadata interface
    /// @param _metadataAddress address of metadata contract
    function setMetadataAddress(address _metadataAddress) external onlyOwner {
        metadataAddress = _metadataAddress;
    }

    // =========================================================================
    // Private/Helper Functions
    // =========================================================================

    /// @dev Verify signature by recreating message hash that we signed on client side
    /// then using that to recover the address that signed the signature
    /// @param _role role of fintechie to be minted
    /// @param _signature signature of mint request
    /// @return true if signature is valid, false otherwise
    function _verifySignature(uint256 _role, bytes memory _signature) private view returns (bool) {
        if (_offchainSigner == address(0)) revert MintNotActive();

        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, _role));

        address signer = messageHash.toEthSignedMessageHash().recover(_signature);

        return signer == _offchainSigner;
    }
}
