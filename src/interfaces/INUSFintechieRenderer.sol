// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface INUSFintechieRenderer {
    /// @notice renders a Fintechie SVG
    /// @param _seed seed to select traits for Fintechie
    /// @param _role role of Fintechie
    /// @return SVG string representing Fintechie
    function render(uint256 _seed, uint256 _role) external view returns (string memory);
}
