// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract NFSMembershipTraits {
    function getBackground(uint256 _backgroundId)
        public
        pure
        returns (string memory)
    {
        string[10] memory backgrounds = [
            "", // Index 0 is empty
            "#141D48", // Dark Blue
            "#6F2430", // Dark Red
            "#C4A484", // Pastel Brown
            "#433F71", // Dark Purple
            "#105544", // Dark Green
            "#A8B0B2", // Gray/Silver
            "#000000", // Black
            "#FFD700", // Gold
            "#ECE7E5" // Off White
        ];

        return backgrounds[_backgroundId];
    }

    function getDepartment(uint256 _departmentId)
        public
        pure
        returns (string memory)
    {
        string[5] memory departments = [
            "MACHINE LEARNING",
            "BLOCKCHAIN",
            "SOFTWARE DEVELOPMENT",
            "INTERNAL AFFAIRS",
            "EXTERNAL RELATIONS"
        ];

        return departments[_departmentId];
    }

    function getRole(
        uint256 _departmentId /*, uint256 _roleId */
    ) public pure returns (string memory) {
        // MACHINE LEARNING
        if (_departmentId == 0) {}
        // BLOCKCHAIN
        else if (_departmentId == 1) {}
        // SOFTWARE DEVELOPMENT
        else if (_departmentId == 2) {}
        // INTERNAL AFFAIRS
        else if (_departmentId == 3) {}
        // EXTERNAL RELATIONS
        else if (_departmentId == 4) {}

        return "";
    }
}
