# Token Standards Cheat Sheet: ERC-20 vs. ERC-721

Chapter 6 teaches both standards across twelve and fourteen lessons
respectively. This is the side-by-side comparison to pin to your second
monitor while you're writing either one — every function and state
variable below is exactly what the course builds, lesson by lesson.

## The core difference, in one line

**ERC-20 tracks *amounts*. ERC-721 tracks *specific, unique items.*** Every
other difference below follows from that one fact.

## Required interface functions

| ERC-20 (`IERC20`) | ERC-721 (minimum from class) |
|---|---|
| `totalSupply()` | `balanceOf(address owner)` |
| `balanceOf(address account)` | `ownerOf(uint256 tokenId)` |
| `transfer(address to, uint256 amount)` | `transferFrom(address from, address to, uint256 tokenId)` |
| `allowance(address owner, address spender)` | `approve(address to, uint256 tokenId)` |
| `approve(address spender, uint256 amount)` | `getApproved(uint256 tokenId)` |
| `transferFrom(address from, address to, uint256 amount)` | |

## State variables

```solidity
// ERC-20
uint256 public totalSupply;
mapping(address => uint256) public balanceOf;
mapping(address => mapping(address => uint256)) public allowance;

// ERC-721
mapping(uint256 => address) private _owners;        // tokenId -> owner
mapping(address => uint256) private _balances;       // owner -> count
mapping(uint256 => address) private _tokenApprovals;  // tokenId -> approved address
```

Notice the ERC-721 owner mapping is keyed by `tokenId`, not by address —
there's no single "balance number" that means anything for a specific
token the way it does for a token amount.

## Events

```solidity
// ERC-20
event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);

// ERC-721 — same event names, different last parameter
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
```

Both standards reuse the names `Transfer` and `Approval` — wallets and
block explorers tell them apart by the event's actual parameter types,
not the name.

## Minting (creating new supply/items)

```solidity
// ERC-20 — amount-based
function _mint(address to, uint256 amount) internal {
    balanceOf[to] += amount;
    totalSupply += amount;
    emit Transfer(address(0), to, amount);
}

// ERC-721 — identity-based
function mint(address to, uint256 tokenId) public {
    require(to != address(0), "Cannot mint to zero address");
    require(_owners[tokenId] == address(0), "Token already exists");
    _owners[tokenId] = to;
    _balances[to] += 1;
    totalSupply += 1;
    emit Transfer(address(0), to, tokenId);
}
```

ERC-20 minting can never collide — you're just adding to a number.
ERC-721 minting has to actively check the `tokenId` isn't already taken,
since every token must be unique.

## The real-world default: don't write either by hand

```solidity
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {}
}
```

Chapter 6 deliberately has you write both standards from scratch first,
then shows the real production path: inherit OpenZeppelin's audited
version (`is ERC20` / `is ERC721`) instead of maintaining your own copy
of logic that's already been reviewed by security researchers.
