// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface INUSFintechieMetadata {
    /// @notice Generates name for Fintechie based on seed and role
    /// @param _seed seed used to generate name
    /// @param _role role of Fintechie
    /// @return string of Fintechie name
    /// @dev Example return string: "The Creative Leader"
    function generateName(uint256 _seed, uint256 _role) external view returns (string memory);

    /// @notice Generates attributes for Fintechie based on seed and role
    /// @param _seed seed used to generate attributes
    /// @param _role role of Fintechie
    /// @return string of Fintechie attributes
    /// @dev Example return string:
    /// [{"trait_type": "hat", "value":"internal affairs"},{"trait_type": "color", "value":"green"},{"trait_type": "background", "value":"normal"}]
    function generateAttributes(uint256 _seed, uint256 _role) external view returns (string memory);

    /// @notice Generates description for Fintechie collection
    /// @return string of Fintechie collection description
    function collectionDescription() external pure returns (string memory);
}
