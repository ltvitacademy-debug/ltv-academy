# Lesson 8 — The ERC-20 Interface & Token Metadata

**Chapter 6 · Token Standards · Lesson 8 of 12**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- What ERC-20 actually is, in real, precise terms
- Every real method an ERC-20 token must implement
- How to write the formal `IERC20` interface, method by method
- The real state variables every ERC-20 token needs to track

## What ERC-20 actually is

> "ERC20 is a standard for creating fungible tokens on the Ethereum
> blockchain. Fungible means each token is the same as every other
> token, like dollars or Bitcoin. This standard ensures that all ERC20
> tokens behave the same way, so wallets, exchanges, and DApps can
> easily interact with them."

And critically: **"ERC20 is not a coin or a physical object. It's a
smart contract written in Solidity that keeps track of who owns how
many tokens and allows people to send tokens to each other."**

## The real, complete interface

![The actual, complete `IERC20` interface from class — every one of the six real methods a token must implement to be considered ERC-20.](/courses/blockchain/ch06/08-erc20-interface/shot_ierc20_interface.png)
*Every real function name here is non-negotiable — this is what makes a contract an ERC-20 token.*

```solidity
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}
```

| Function | Real purpose |
|---|---|
| `totalSupply` | Returns the total number of tokens in existence |
| `balanceOf` | Returns how many tokens a specific wallet holds |
| `transfer` | Sends tokens from the caller to another wallet |
| `approve` | Lets another address (like a contract) spend your tokens |
| `allowance` | Checks how much a spender is still allowed to spend on an owner's behalf |
| `transferFrom` | Sends tokens on someone else's behalf, if they've approved it |

## The real events every ERC-20 needs

![The real Transfer and Approval events, plus every state variable this token needs: totalSupply, balanceOf, allowance, name, symbol, and decimals.](/courses/blockchain/ch06/08-erc20-interface/shot_events_state_variables.png)
*Every real state variable an ERC-20 token actually tracks, declared together.*

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);

uint256 public totalSupply;
mapping(address => uint256) public balanceOf;
mapping(address => mapping(address => uint256)) public allowance;
string public name;
string public symbol;
uint8 public decimals;
```

- **`Transfer`** fires every time tokens move between addresses.
- **`Approval`** fires every time someone calls `approve`.
- **`decimals`** determines how divisible your token is — most real
  tokens use `18`, the same way a dollar divides into 100 cents.

## Key terms

| Term | Meaning |
|---|---|
| Fungible | Every unit is identical and interchangeable, like dollars |
| Interface | A formal contract specifying exactly which functions must exist |
| decimals | How many places past the "whole token" your token supports |

## Check yourself

Before moving to the next lesson, make sure you can name, from memory,
all six real functions an ERC-20 token must implement.
