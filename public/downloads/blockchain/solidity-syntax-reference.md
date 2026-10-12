# Solidity Core Syntax Reference

A compiled quick-reference for everything Chapter 5 (Solidity Programming)
and the access-control pattern from Chapter 6 cover, pulled together into
one page so you don't have to hunt back through individual lesson guides
mid-contract. Every snippet here is real syntax taught in the course, not
simplified or invented for this reference.

## Data types

```solidity
uint256 public totalSupply;   // unsigned integer — no negative values, the default for counts/amounts
int256 public delta;          // signed integer — can go negative
bool public started;          // true/false
address public owner;         // a 20-byte Ethereum address
address payable public seller; // an address allowed to receive ETH directly
string public name;           // UTF-8 text
bytes public data;            // raw byte data
```

`uint` and `int` default to 256 bits unless you size them down (`uint8`,
`uint32`, etc.) — sizing down only matters for gas optimization inside
tightly packed structs, not for day-to-day contract logic.

## Function visibility and mutability

```solidity
function totalSupply() external view returns (uint256) { ... }
function balanceOf(address a) public view returns (uint256) { ... }
function _mint(address to, uint256 amount) internal { ... }
function helper(uint x) private pure returns (uint) { return x * 2; }
```

| Keyword | Meaning |
|---|---|
| `external` | Only callable from outside the contract |
| `public` | Callable from outside AND from within the contract |
| `internal` | Only this contract and contracts that inherit from it |
| `private` | Only this exact contract |
| `view` | Reads state but never writes it |
| `pure` | Touches no state at all — not even reading it |
| (no mutability keyword) | Can write to state |

## The constructor

```solidity
constructor(string memory _name, string memory _symbol, uint8 _decimals) {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    owner = msg.sender;
}
```

Runs exactly once, at deployment. There is no way to call it again later —
if a value needs to change after deployment, it needs its own setter
function, not a second call to the constructor.

## Control flow

```solidity
if (msg.value > highestBid) {
    // higher bid logic
} else if (msg.value == highestBid) {
    revert("Bid must exceed the current highest bid");
} else {
    revert("Bid too low");
}

// ternary
uint256 fee = (amount > 1000) ? amount / 100 : 0;
```

## Loops

```solidity
for (uint256 i = 0; i < owners.length; i++) {
    if (owners[i] == msg.sender) {
        continue; // skip to the next iteration
    }
    if (owners[i] == address(0)) {
        break; // stop the loop entirely
    }
}

uint256 i = 0;
while (i < transactions.length) {
    i++;
}
```

Loops over unbounded arrays are a real gas-cost risk in production —
an array that keeps growing (like a list of all bidders ever) can
eventually make a function too expensive to call at all.

## Modifiers (access control)

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not the owner");
    _;
}

function restrictedAction() public onlyOwner {
    // only runs if the require() above passed
}
```

The `_;` marks exactly where the function body being modified actually
runs. Code before `_;` runs first (the real guard); code after `_;`
would run after the function body completes.

## Events

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);

emit Transfer(msg.sender, recipient, amount);
```

`indexed` parameters (up to three per event) are what let off-chain code
and block explorers efficiently search the chain for every time a given
address or value appeared in this event.

## The zero address check

```solidity
require(to != address(0), "Cannot mint to zero address");
```

`address(0)` is the one address nothing can ever actually control — it's
used as a stand-in for "no address" (checking a mapping that was never
set) and for "minting"/"burning" in `Transfer` events, since there's no
real sender or recipient in either case.
