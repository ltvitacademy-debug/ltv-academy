# Common Template Mistakes

Chapters so far have described how templates are supposed to work. This lesson is about how they actually fail — the small, specific mistakes that account for most rejected FBDI rows, long before you ever reach the troubleshooting techniques in Chapter 5. Recognizing these patterns now will save you hours later.

## What you'll learn

- The structural mistakes that break a template before any data issue even matters
- The data-entry mistakes that pass unnoticed until the import process runs
- Why a file can upload successfully and still fail at the next stage
- A short checklist to run before generating CSV files

## Structural mistakes: breaking the template itself

- **Inserting or deleting columns.** Covered in lesson 5, but worth repeating because it's the single most damaging mistake: it breaks the direct mapping between spreadsheet column and interface-table column, and the macro has no way to detect or warn about it.
- **Reordering columns.** Same root cause as above — even without adding or removing anything, swapping two columns' positions silently scrambles which value lands in which interface-table column.
- **Leaving sample or placeholder rows in place.** These were shown as examples, not real data. If left above or below your actual rows, they get exported as real rows and either duplicate data or fail validation outright.
- **Working in the wrong tab.** Multi-tab templates sometimes have tabs for related-but-different data (for example, invoice headers versus invoice lines). Entering line-level data on the header tab, or vice versa, produces a technically well-formed file that still fails because it's structurally wrong for what it claims to be.

## Data-entry mistakes: wrong values in the right place

- **Typing lookup labels instead of codes.** Covered in lesson 6 — "US Dollars" instead of `USD` is the classic version of this mistake.
- **Mismatched date formats.** A date typed or pasted in a format your regional Excel settings accept, but that doesn't match what the interface table expects, often converts silently to the wrong date rather than raising an error.
- **Leading zeros or special characters lost.** A supplier number like `00452` typed into a numeric-formatted cell can lose its leading zeros, becoming `452` — a different value than the one that exists, or doesn't exist, in the system.
- **Trailing spaces and invisible characters.** Pasting from another system (a legacy ERP export, a PDF, an email) sometimes brings along stray spaces or non-printing characters that look identical to clean data but fail an exact-match validation.

## Why a successful upload doesn't mean a successful import

None of these mistakes necessarily stop a file from uploading to UCM or loading into an interface table — those steps mostly check that a file exists and is formatted as a valid CSV, not that its business content makes sense. The mistakes above are caught later, during the product-specific import process, which is exactly why "the upload worked" and "the data loaded" are two different claims, and why Chapter 5 exists.

## A short pre-flight checklist

Before generating CSV files, it's worth a quick pass to confirm: no columns were added, removed, or reordered; no sample rows remain; data is on the correct tab; lookup fields use codes, not labels; dates are formatted consistently; and no stray blank rows sit inside or after your real data.

## Recap

Most rejected FBDI rows trace back to a small, repeatable set of mistakes: broken template structure, wrong tab, lookup labels instead of codes, mismatched dates, or lost leading zeros — and none of these show up until the import process actually runs. Next up, lesson 9: putting all of this together in a complete, worked example — loading suppliers with FBDI.
