# Bank Statement Transaction Codes

Every line on a bank statement carries a code that tells you what kind of transaction it is — a wire transfer, an ACH credit, a returned item, a lockbox deposit. This lesson covers how those codes work, using BAI2 as the primary example, and why mapping them correctly is one of the most important pieces of reconciliation setup.

## What you'll learn

- How BAI2 transaction type codes are organized
- A few concrete example codes and what they mean
- Why Oracle needs a mapping between a bank's codes and Oracle's own transaction types
- What happens when a code is unmapped

## How BAI2 codes are organized

BAI2 transaction type codes are grouped into numeric ranges by what they represent:

| Range | Meaning |
|---|---|
| 001–099 | Account-level status/balance codes (not transactions) |
| 100 | Total credits summary |
| 101–399 | Credit summary and detail codes |
| 400 | Total debits summary |
| 401–699 | Debit summary and detail codes |

So a code in the 100s or low 300s is a credit of some kind (money coming in), and a code in the 400s–600s is a debit (money going out). A few concrete examples: code `195` is a wire transfer received, `475` is an ACH credit, `455` is a returned ACH item (a credit that got reversed — which triggers very different handling than a normal deposit), and `496` is a lockbox deposit.

## Why mapping matters

Oracle doesn't just store the raw bank code — it needs to know what that code *means* in Oracle's own terms, because that meaning drives downstream behavior: which transactions a reconciliation matching rule should even consider, how the line should display, and in some cases what external transaction type gets created if the line has no system counterpart. This is done through **configurable BAI2 transaction code mapping**, where an implementation maps each bank-specific code to one of Oracle's standard transaction codes/types.

This mapping matters because banks aren't perfectly consistent. First Continental Bank might use code `475` for a generic ACH credit, while a different bank sends essentially the same kind of transaction under a different code, or with bank-specific codes outside the standard ranges. Without a correct mapping, Oracle has no reliable way to know that two differently-coded lines from two different banks both mean "an ACH credit arrived."

## What happens with an unmapped code

If a statement line arrives with a transaction code that has no mapping configured, Cash Management can't confidently classify it. Depending on configuration, it may still import as a line (visible, but without a clean transaction-type classification) or it may need an implementer to add the missing mapping before it's handled the way similar codes are. Either way, an unmapped code is a setup gap, not a one-off data error — the fix is to add the mapping once, not to fix each statement line by hand every time it recurs.

## Key terms

| Term | Meaning |
|---|---|
| BAI2 transaction type code | A numeric code on a statement line identifying what kind of transaction it is |
| Configurable BAI2 transaction code mapping | The setup that translates a bank's codes into Oracle's standard transaction types |
| Unmapped code | A code with no configured mapping, usually signaling a setup gap |

## Recap

Transaction codes classify every statement line as a specific kind of credit or debit, and Oracle needs those bank-specific codes mapped to its own standard types before reconciliation can use them intelligently. An unmapped code is a configuration gap to fix once, not a recurring data problem. Next up, lesson 8: common bank statement errors and how to correct them.
