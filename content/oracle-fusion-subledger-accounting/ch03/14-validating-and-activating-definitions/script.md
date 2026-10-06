# Script — Validating and Activating Definitions

## Segment 1 (title)

You've built rules, bundled them into AADs, assembled AADs into a method, and assigned that method to a ledger. Before any of this can process a real transaction, it has to pass through one more gate: validation and activation.

## Segment 2 (steps)

Everything you've built is configuration data, assembled by a person across many screens and sessions. It's entirely possible to leave something incomplete: an account rule missing a default condition, a rule referencing a deleted journal line type, a mapping set missing an entry. Validation is the automated check Oracle runs across an AAD's structure to catch exactly these problems before they hit live processing.

## Segment 3 (steps)

Validation and activation are two separate steps. Validation confirms the definition is structurally sound. Activation is what actually makes a validated AAD available to Create Accounting for real events. You cannot activate an AAD that hasn't passed validation - Oracle won't let known-incomplete configuration into production use.

## Segment 4 (code)

Picture an account rule for Freight lines with one condition: if freight category is Domestic, use account 6510. No fallback exists. A real transaction later arrives with category International, and no condition matches - the rule has nothing to return. Validation is built to catch exactly this kind of gap before activation, not after.

## Segment 5 (steps)

You can't skip this gate. Oracle won't activate an AAD that fails validation, and only activated AADs can be referenced by a method for live processing. That's deliberate - better to find the gap during a controlled setup session than have a controller discover it weeks later when a transaction silently fails to account.

## Segment 6 (outro)

So remember: validation checks structural completeness, activation makes a validated AAD usable, and Oracle enforces that order. That closes chapter three. Up next, chapter four, lesson fifteen: creating accounting, draft versus final, where this configuration processes a real transaction for the first time.
