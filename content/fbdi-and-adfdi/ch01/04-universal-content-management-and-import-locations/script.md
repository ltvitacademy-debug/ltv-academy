# Script — Universal Content Management and Import Locations

## Segment 1 (title)

Before an FBDI file can be loaded into an interface table, it has to live somewhere. That somewhere is Universal Content Management, or UCM — Oracle Fusion's built-in document repository. This lesson covers what it is, and why the upload location you choose actually matters.

## Segment 2 (steps)

UCM is Oracle's enterprise content repository, used for all sorts of documents across Fusion, not just FBDI. For our purposes its job is narrow: it's the drop-off point where your zipped CSV files land, before the Load Interface File for Import process can read them at all.

## Segment 3 (steps)

You upload through Tools, File Import and Export, in the Fusion navigator. That screen asks you to choose an account — a category that tells UCM what kind of file this is and where it belongs. Accounts are scoped to specific products: one for payables imports, one for general ledger imports, and so on. The Load Interface File for Import process looks for files in a specific account. Pick the wrong one, and your file is effectively invisible to the process that needs it.

## Segment 4 (steps)

Imagine uploading supplier records into a journal-import account. The file sits right where you put it, but the import process pointed at suppliers has no reason to look there — it finds nothing, and reports zero rows processed. No error at the upload step. The mismatch only shows up later, as a silent, confusing dead end.

## Segment 5 (outro)

UCM is the physical destination for the upload step in the pipeline you learned last lesson, and the account is the detail that makes the next step able to find your file at all. Up next, Chapter 2: a close look at the FBDI templates themselves, starting with how to download and read one.
