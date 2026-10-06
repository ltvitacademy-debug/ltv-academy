# Script — Bank Statement Transaction Codes

## Segment 1 (title)

Every line on a bank statement carries a code that tells you what kind of transaction it is — a wire transfer, an ACH credit, a returned item, a lockbox deposit. This lesson covers how those codes work, using BAI2 as the example.

## Segment 2 (code)

BAI2 codes are grouped into numeric ranges. Codes one through ninety-nine are account level status codes, not transactions. One hundred is the total credits summary, and 101 through 399 are credit codes. 400 is the total debits summary, and 401 through 699 are debit codes. A few concrete examples: code 195 is a wire transfer received, 475 is an ACH credit, 455 is a returned ACH item, and 496 is a lockbox deposit.

## Segment 3 (steps)

Oracle doesn't just store the raw bank code — it needs to know what that code means in Oracle's own terms, because that drives which matching rules even consider the transaction. This happens through configurable BAI2 transaction code mapping, where each bank-specific code gets mapped to one of Oracle's standard transaction types. Banks aren't consistent with each other, so this mapping has to be set up deliberately, not assumed.

## Segment 4 (steps)

So what happens with a code that has no mapping configured? Cash Management can't confidently classify it. It may still import as a visible line without a clean classification, or it may need an implementer to add the missing mapping. Either way, that's a setup gap to fix once — not a data error to fix line by line every time it shows up.

## Segment 5 (outro)

Get the mapping right once, and every future statement benefits. Up next, lesson eight: common bank statement errors, and how to correct them.
