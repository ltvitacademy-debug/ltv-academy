# Script — Loading and Importing Bank Statements

## Segment 1 (title)

A bank statement file doesn't become usable the instant it lands on a server. Oracle moves it through a two-step process, load and then import, before any of its transactions are available for reconciliation.

## Segment 2 (steps)

The file gets to Oracle one of two ways. Automated delivery has the bank or a banking gateway place the file on an SFTP location on a schedule, picked up by a scheduled process. Manual upload has a user download the file from the bank's portal and upload it directly in the Cash Management and Banking work area. Either way it arrives in one of last lesson's formats, with an expected extension like dot txt, dot dat, dot csv or dot xml.

## Segment 3 (steps)

Two steps happen next. Load reads the raw file and creates staging bank statement header and line records — essentially a literal transcription, without validating it against Oracle's setup data yet. Import is where validation happens: it checks the account number maps to a real bank account record, confirms the statement isn't a duplicate, and converts the staged data into real records reconciliation can use. Only after import succeeds are a statement's lines available for reconciliation.

## Segment 4 (code)

A worked example: Harborview Metals Inc receives a BAI2 file nightly from First Continental Bank over SFTP. A scheduled load process picks it up at 2 AM. A scheduled import process runs at 2:15, validates the account mapping, and makes yesterday's transactions available before Treasury logs in. If the bank ever renumbers an account without telling IT, that mismatch surfaces at import, not load.

## Segment 5 (outro)

Most real statement problems show up at import, where account mapping gets checked. Up next, lesson seven: the transaction codes that ride along on each statement line.
