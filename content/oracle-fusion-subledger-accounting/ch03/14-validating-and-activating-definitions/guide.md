# Validating and Activating Definitions

You've built rules, bundled them into AADs, assembled AADs into a method, and assigned that method to a ledger. Before any of this configuration can actually process a real transaction, it has to pass through one more gate: validation and activation. This lesson closes out Chapter 3 by covering that gate.

## What you'll learn

- Why Oracle requires validation before an AAD can be used
- What kinds of problems validation catches
- The difference between a validated AAD and an activated AAD
- What happens if you try to use an AAD that hasn't cleared this gate

## Why validation exists

Everything you've built across this course — journal line rules, account rules, mapping sets, description rules, supporting references, AADs — is configuration data, assembled by a person, potentially across many separate screens and many separate sessions. It is entirely possible to leave something incomplete: an account rule with no default value for a condition that isn't met, a journal line rule referencing a journal line type that was deleted, a mapping set missing an entry for a value that exists on real transactions.

**Validation** is the automated check Oracle runs across an AAD's full structure to catch these problems before they can cause a failure during live transaction processing. Validation checks things like: does every account rule have a complete set of conditions with no gaps, are all referenced objects (journal line types, mapping sets, supporting references) still present and correctly configured, and is the overall structure of the AAD internally consistent.

## Validation versus activation

**Validation** confirms the definition is structurally sound. **Activation** is the separate step that actually makes a validated AAD available for Create Accounting to use when processing real events. You cannot activate an AAD that has not successfully passed validation — Oracle will not let you put known-incomplete configuration into production use. Once an AAD is validated and activated, it is eligible to be referenced inside an accounting method and used for live transactions.

## What validation catches — a concrete case

Imagine a consultant builds an account rule for the Natural Account segment on Freight journal lines, with one condition: "if freight category is Domestic, use account 6510." No fallback condition exists for any other freight category. If a real transaction later comes in with freight category "International," and no condition matches, the account rule has nothing to return. Validation is designed to catch exactly this kind of gap — an incomplete rule with no default or catch-all condition — before the AAD is ever activated, rather than letting the gap surface for the first time against a live transaction.

## What happens if you skip this gate

You cannot actually skip it: Oracle will not activate an AAD that fails validation, and only activated AADs can be referenced by an accounting method for live processing. This is a deliberate design choice — it is far better for a consultant to discover a gap during validation, in a controlled setup session, than for a controller to discover it weeks later when a transaction silently fails to account correctly.

## Recap

Validation checks an AAD's structure for completeness and internal consistency; activation is the separate step that makes a validated AAD usable for live transaction processing, and Oracle will not let an unvalidated AAD be activated. This closes Chapter 3. Next up, Chapter 4 begins with lesson 15: creating accounting, draft versus final, where you'll see this fully built, validated, and activated configuration process a real transaction for the first time.
