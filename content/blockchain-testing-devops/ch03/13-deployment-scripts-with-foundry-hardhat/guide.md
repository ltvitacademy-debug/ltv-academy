# Lesson 13 — Deployment Scripts With Foundry/Hardhat

**Chapter 3 · Deployment Strategy · Lesson 13 of 29**

## What you'll learn

- The real `forge script` syntax, from a dry-run simulation to a broadcast transaction
- Why a keystore `--account` is the safer alternative to a raw `--private-key` flag
- How `foundry.toml`'s `[rpc_endpoints]` table turns a long RPC URL into a short, reusable alias
- Why "deploy" should be a reviewable script, not a one-off command typed from memory

## A deployment is code, not a command

A deploy script in Foundry is itself a Solidity contract — reviewable, testable, and versioned alongside everything else, instead of a sequence of `cast send` commands someone ran once and nobody can reproduce exactly:

```solidity
// script/Deploy.s.sol
contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        Vault vault = new Vault(owner, feeRecipient);
        vm.stopBroadcast();
    }
}
```

## From dry-run to broadcast

Running the script with no flags **simulates** it — no transaction is actually sent, which is how you catch a broken constructor argument or a revert before it costs real gas:

```bash
forge script script/Deploy.s.sol
```

Adding `--broadcast` and `--rpc-url` actually sends the transaction to the target network:

```bash
forge script script/Deploy.s.sol --broadcast --rpc-url $RPC_URL
```

## Keys: `--private-key` vs. a keystore account

A raw `--private-key $PRIVATE_KEY` flag works, but it puts a plaintext private key into shell history and process arguments — a real operational risk. Foundry's recommended alternative is a keystore account, which keeps the key encrypted on disk and only prompts for a password at broadcast time:

```bash
forge script script/Deploy.s.sol --broadcast --rpc-url $RPC_URL --account deployer
```

## Naming RPC endpoints instead of pasting URLs

Typing a full RPC URL on every deploy command is error-prone — `foundry.toml`'s `[rpc_endpoints]` table gives each network a short alias:

```toml
[rpc_endpoints]
sepolia = "${SEPOLIA_RPC_URL}"
mainnet = "${MAINNET_RPC_URL}"
```

```bash
forge script script/Deploy.s.sol --broadcast --rpc-url sepolia
```

One real gotcha worth internalizing now: `--chain` only sets the EVM's `block.chainid` value inside the simulation — it does **not** select which network the transaction actually broadcasts to. `--rpc-url` is what controls the destination; mixing those up is how a script ends up aimed at the wrong network.

## Verification in the same command

Lesson 14 covers Etherscan verification in depth, but it's worth knowing the deploy script can trigger it in the same step:

```bash
forge script script/Deploy.s.sol --broadcast --rpc-url sepolia \
  --verify --etherscan-api-key $ETHERSCAN_API_KEY
```

## Key terms

| Term | Meaning |
|---|---|
| `forge script` (no flags) | Simulates the deployment — no transaction sent |
| `--broadcast` | Actually sends the deployment transaction |
| `--account` | Uses an encrypted keystore key instead of a raw private key flag |
| `[rpc_endpoints]` | foundry.toml table mapping a short name to a full RPC URL |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why doesn't the `--chain` flag alone determine which network a deployment actually broadcasts to?
