// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/NFSMembershipTraits.sol";

contract NFSMembershipTraitsTest is Test {
    NFSMembershipTraits t;

    function setUp() public {
        t = new NFSMembershipTraits();
    }

    function testGetBackground() public {
        // Dark Blue
        assertEq(t.getBackground(1), "#141D48");
        // Dark Red
        assertEq(t.getBackground(2), "#6F2430");
        // Pastel Brown
        assertEq(t.getBackground(3), "#C4A484");
        // Dark Purple
        assertEq(t.getBackground(4), "#433F71");
        // Dark Green
        assertEq(t.getBackground(5), "#105544");
        // Gray/Silver
        assertEq(t.getBackground(6), "#A8B0B2");
        // Black
        assertEq(t.getBackground(7), "#000000");
        // Gold
        assertEq(t.getBackground(8), "#FFD700");
        // Off White
        assertEq(t.getBackground(9), "#ECE7E5");
    }

    function testGetDepartment() public {
        // MACHINE LEARNING
        assertEq(t.getDepartment(0), "MACHINE LEARNING");
        // BLOCKCHAIN
        assertEq(t.getDepartment(1), "BLOCKCHAIN");
        // SOFTWARE DEVELOPMENT
        assertEq(t.getDepartment(2), "SOFTWARE DEVELOPMENT");
        // INTERNAL AFFAIRS
        assertEq(t.getDepartment(3), "INTERNAL AFFAIRS");
        // EXTERNAL RELATIONS
        assertEq(t.getDepartment(4), "EXTERNAL RELATIONS");
    }

    function testGetRole() public {
        // MACHINE LEARNING
        assertEq(t.getSubDepartment(0, 0), "ANALYST (RESEARCH)");
        assertEq(t.getSubDepartment(0, 1), "ANALYST (PROJECT)");
        assertEq(t.getSubDepartment(0, 2), "ANALYST (ALGO TRADING)");

        // BLOCKCHAIN
        assertEq(t.getSubDepartment(1, 0), "RESEARCH ANALYST");
        assertEq(t.getSubDepartment(1, 1), "COMMUNITY MANAGER");
        assertEq(t.getSubDepartment(1, 2), "BLOCKCHAIN DEVELOPER");

        // SOFTWARE DEVELOPMENT
        assertEq(t.getSubDepartment(2, 0), "UIUX DESIGNER");
        assertEq(t.getSubDepartment(2, 1), "SOFTWARE ENGINEER");

        // INTERNAL AFFAIRS
        assertEq(t.getSubDepartment(3, 0), "PROJECT MANAGEMENT");
        assertEq(t.getSubDepartment(3, 1), "TALENT MANAGEMENT");
        assertEq(t.getSubDepartment(3, 2), "FINANCE");
        assertEq(t.getSubDepartment(3, 3), "COMMUNITY DEVELOPMENT");
        assertEq(t.getSubDepartment(3, 4), "PRODUCT MANAGER");

        // EXTERNAL RELATIONS
        assertEq(t.getSubDepartment(4, 0), "PARTNERSHIP");
        assertEq(t.getSubDepartment(4, 1), "MARKETING");
    }
}
