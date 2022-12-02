# On-Chain Membership NFTs

NUS Fintech Society Blockchain Department Winter Project AY22/23

![Github Actions](https://github.com/devanonon/hardhat-foundry-template/workflows/test/badge.svg)

## File Structure

```ml
├── frontend ── Next.js Frontend
├── lib ──Contract Dependencies
├── script ── Scripts to deploy contracts (Foundry)
├── src ──Contract Source Code
├── tasks ── Hardhat Tasks
├── test ── Tests for Contracts (Hardhat and Foundry)
```

## Getting Started

### Dependencies

* [Foundry](https://getfoundry.sh/)
  * For windows users, it is better to use WSL so that you can update foundry easily through foundryup

* Use Foundry:

```bash
forge install
forge test
```

* Use Hardhat:

```bash
npm install
npx hardhat test
```

* Write / run tests with either Hardhat or Foundry:

```bash
forge test
# or
npx hardhat test
```

* Use Hardhat's task framework

```bash
npx hardhat example
```

* Install libraries with Foundry which work with Hardhat.

```bash
forge install rari-capital/solmate # Already in this repo, just an example
```

## Notes

Whenever you install new libraries using Foundry, make sure to update your `remappings.txt` file by running `forge remappings > remappings.txt`. This is required because we use `hardhat-preprocessor` and the `remappings.txt` file to allow Hardhat to resolve libraries you install with Foundry.
