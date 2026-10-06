# Script — Token Supply Models

## Segment 1 (title)

Four basic supply shapes: fixed, capped and gradually minted, inflationary with no ceiling, and deflationary where supply actively shrinks. These aren't mutually exclusive -- a token can be capped and still net-deflationary.

## Segment 2 (steps: four supply model shapes)

Fixed supply sets a hard cap at genesis and never mints more. Capped supply mints gradually toward a ceiling. Inflationary supply has no ceiling at all. Deflationary supply shrinks over time through burns.

## Segment 3 (code: circulating vs total vs max supply)

Max supply is the hard ceiling. Total supply is everything minted so far, including locked and treasury tokens. Circulating supply subtracts those out -- it's what's actually tradeable right now, and it's almost always smaller than total supply.

## Segment 4 (code: burn mechanism math)

Net supply change equals emissions minted minus tokens burned. Twenty million minted against twenty-five million burned in fee-driven burns nets out to a five million token contraction that year -- even while the protocol is still actively paying staking rewards.

## Segment 5 (outro)

The supply model -- fixed, capped, inflationary, or deflationary -- is a design choice with real consequences for price and holder behavior. Next up: utility versus governance tokens, and what each one is actually for.
