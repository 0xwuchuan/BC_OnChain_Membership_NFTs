// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {LibString} from "solady/src/utils/LibString.sol";
import {INUSFintechieMetadata} from "./interfaces/INUSFintechieMetadata.sol";

contract NUSFintechieMetadata is INUSFintechieMetadata {
    using LibString for string;
    using LibString for uint256;

    /// @notice Number of bits used in Renderer to determine traits
    /// @dev Declared to avoid reusing bits to generate name
    uint256 immutable BITS_USED = 16;

    /// @notice Description of NUSFintechie collection
    string constant COLLECTION_DESCRIPTION = "Commemorate your role in the NUS Fintech Society with "
        "a unique Fintechie that lives on-chain as a soulbound NFT.\\n\\n"
        "Fintechies represent your membership and involvement with the society, "
        "forever enshrined on the blockchain.\\n\\n Friends of "
        "the society can also mint your own Fintechie to show your support.";

    /// @notice Joined list of adjectives used to generate name with `_` as delimiter
    /// @dev To get string[] use `LibString.split(string(ADJECTIVES), "_")`
    bytes constant ADJECTIVES = "Creative_Pioneering_Trailblazing_Forward-thinking_Revolutionary_Agile_"
        "Original_Innovative_Inspiring_Imaginary_Ideating_Bold_Dynamic_Ingenious_Fearless_"
        "Daring_Analytical_Independent_Enthusiastic_Inquisitive_Defiant_Ordinary_"
        "Unlikely_Vibe_Mellow_Smooth_Effortless_Calm_Laid-back_Ancient_Shy_"
        "Helpful_Worried_Nimble_Spirited_Whimsical_Fresh_Emo_Unorthodox_Zen_Effervescent_"
        "Ethereal_Curious_Omnipotent_Nomadic_Enigmatic_Orbital_Cerebral_Mythical_Peculiar";

    /// @notice Joined list of roles used to generate name with `_` as delimiter
    /// @dev To get string[] use `LibString.split(string(ROLES), "_")`
    bytes constant ROLES = "Friend_Ambassador_Coordinator_Leader_Punk_Robot_Code_Algorithm_Elder";

    /// @notice Joined list of hats used to generate attributes with `_` as delimiter
    /// @dev To get string[] use `LibString.split(string(HATS), "_")`
    bytes constant HATS = "none_external affairs_internal affairs_presidential cell_"
        "blockchain_machine learning_software development_quant_alumni";

    /// @notice Joined list of colors used to generate attributes with `_` as delimiter
    /// @dev To get string[] use `LibString.split(string(COLORS), "_")`
    bytes constant COLORS = "purple_orange_yellow_green_red_blue";

    /// @inheritdoc INUSFintechieMetadata
    function generateName(uint256 _seed, uint256 _role) external pure returns (string memory) {
        string[] memory adjectives = string(ADJECTIVES).split("_");
        string[] memory roles = string(ROLES).split("_");

        // Skip the bits used in Renderer
        _seed >>= BITS_USED;

        return string.concat("The ", adjectives[_seed % 50], " ", roles[_role]);
    }

    /// @inheritdoc INUSFintechieMetadata
    function generateAttributes(uint256 _seed, uint256 _role) external pure returns (string memory) {
        string[] memory hats = string(HATS).split("_");
        string[] memory colors = string(COLORS).split("_");

        // The bits used to determine the background is [11, 13] (0-indexed)
        // Refer to NUSFintechRenderer.sol to confirm
        bool inverted = (_seed >> 11) & 3 == 0;

        // The bits used to determine the color/hue is [13, 16] (0-indexed)
        // Refer to NUSFintechRenderer.sol to confirm
        uint256 color = (_seed >> 13) % 6;

        return string.concat(
            '[{"trait_type": "hat", "value":"',
            hats[_role],
            '"},',
            '{"trait_type": "color", "value":"',
            colors[color],
            '"},',
            '{"trait_type": "background", "value":"',
            inverted ? "inverted" : "normal",
            '"}',
            "]"
        );
    }

    /// @inheritdoc INUSFintechieMetadata
    function collectionDescription() external pure returns (string memory) {
        return COLLECTION_DESCRIPTION;
    }
}
