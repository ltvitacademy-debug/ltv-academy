# Bank Statement Formats: BAI2, MT940 and CAMT.053

A bank statement arriving at Oracle isn't a PDF — it's a structured data file in one of several standard formats. This lesson covers the three formats you'll encounter most often: BAI2, SWIFT MT940, and ISO 20022 CAMT.053. Oracle Fusion Cash Management supports all of them, along with a few others, but these three cover the large majority of real-world implementations.

## What you'll learn

- What BAI2, MT940, and CAMT.053 are, and where each one came from
- The basic structure of each format
- Why a company might end up using more than one format
- Which formats Oracle Fusion Cash Management supports

## BAI2: the US standard

**BAI2** (Bank Administration Institute, version 2) is a plain-text, line-based format that originated in the US banking industry and remains the most common format for US bank statements. Each line is a record with a type code at the start:

- `01` — File header
- `02` — Group header
- `03` — Account identifier (opens a specific account's section, carries opening/closing balance codes)
- `16` — Transaction detail (one line per transaction, each carrying a BAI2 transaction type code — more on these in Lesson 7)
- `49` — Account trailer
- `98` — Group trailer
- `99` — File trailer

A BAI2 file is nested: one file can contain multiple groups, and one group can contain multiple accounts, each with its own set of transaction detail lines.

## SWIFT MT940: the international standard

**MT940** is a SWIFT message type used heavily outside the US, especially in Europe, for bank-to-customer account statements. It's also line-based, but organized into tagged fields rather than fixed record-type codes:

- `:20:` — Transaction reference number
- `:25:` — Account identification
- `:28C:` — Statement number/sequence
- `:60F:` — Opening balance
- `:61:` — Statement line (one per transaction)
- `:86:` — Information to account owner (narrative detail for the preceding `:61:` line)
- `:62F:` — Closing balance

## CAMT.053: the ISO 20022 successor

**CAMT.053** (`BankToCustomerStatement`) is part of the ISO 20022 family of XML-based financial messaging standards, and is increasingly positioned as the long-term replacement for MT940 in markets that are migrating away from older SWIFT message types. Unlike BAI2 and MT940's flat line formats, CAMT.053 is structured XML, with nested elements for statement-level data, balance entries, and transaction entries — which makes it more verbose but also more explicit about what each piece of data represents. Oracle Fusion Cash Management supports several CAMT.053 versions (such as `camt.053.001.02` and `.001.03`), since the schema has evolved over time.

## Why one company might see more than one format

A multinational company often receives different formats from different banks, or even from the same bank for different accounts, depending on the bank's own systems and the country the account is in. A US-only company might see only BAI2. A European subsidiary's bank might send CAMT.053. Oracle Fusion Cash Management is built to load all of them into the same internal statement structure, so the format a bank happens to send doesn't change how reconciliation works downstream.

## Key terms

| Term | Meaning |
|---|---|
| BAI2 | Bank Administration Institute format; US-centric, line-based, record-type codes |
| MT940 | SWIFT message type; international, line-based, tagged fields |
| CAMT.053 | ISO 20022 XML bank-to-customer statement; the modern successor to MT940 |

## Recap

Banks send statements in standardized file formats, not PDFs — BAI2 for the US, MT940 historically for international statements, and CAMT.053 as the ISO 20022 XML format replacing MT940 in many markets. Oracle Fusion Cash Management loads all of them into the same internal structure. Next up, lesson 6: how those files actually get loaded and imported into Oracle.
