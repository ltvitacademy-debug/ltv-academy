# Preparing CSV Files

**Chapter 1 · Getting Data In · Lesson 4 of 20**

Both the Import Wizard and Data Loader run on the same fuel: a CSV file. A load is only as good as the file behind it, and most "the import failed" tickets trace back to the file, not the tool. This lesson is about what a clean, loadable CSV actually looks like, and the handful of formatting mistakes that cause the most trouble.

## What you'll learn

- The shape a CSV needs to have before either tool will accept it
- How Salesforce expects dates, booleans, and record IDs to be formatted
- The encoding and delimiter traps that corrupt otherwise-correct data
- A short pre-flight checklist for any file before you load it

## The basic shape

A header row, then one row per record, comma-separated, one column per field:

```
FirstName,LastName,Email,Company,LeadSource
Dana,Ruiz,dana.ruiz@example.com,Acme Corp,Web
Omar,Khalil,omar.khalil@example.com,Beta LLC,Trade Show
```

The header row's values don't have to match Salesforce API field names exactly — both tools let you map `Email` in your file to `Email` the field, or `Company Name` in your file to `Company` the field, during the mapping step. But every row needs the same number of columns as the header, and a field left blank for one record is just an empty value between two commas, not a missing column.

## Dates, booleans, and IDs — formats Salesforce expects

- **Dates.** The safest format is `yyyy-MM-dd` (`2026-03-14`), which both tools read without ambiguity. `MM/dd/yyyy` also works, but mixing that with `dd/MM/yyyy` in the same file — or across files from different countries — is a common source of records landing on the wrong date.
- **Booleans.** `true`/`false`, `yes`/`no`, and `1`/`0` are all accepted (case-insensitive). Pick one convention per file and stay consistent.
- **Record IDs.** A Salesforce ID is either 15 characters (case-sensitive) or 18 characters (case-insensitive). If you're exporting IDs from Salesforce to reuse in another file — for update or upsert jobs — export the 18-character version and don't let a spreadsheet program "helpfully" trim or reformat it.

## Commas, quotes, and encoding

```
Name,Description
"Acme Corp, Inc.","Full-service, B2B supplier"
```

A value that itself contains a comma has to be wrapped in double quotes, like `Acme Corp, Inc.` above — otherwise the extra comma splits it into two columns and shifts every column after it. This is the single most common way a CSV silently corrupts itself: one unquoted comma in one row, and the rest of that row's data lands in the wrong fields.

Encoding matters too. Save CSVs as **UTF-8** so accented characters and non-English names survive the round trip — a file saved in a different encoding can turn `José` into garbled characters on import. Both the Import Wizard and Data Loader have settings to read/write CSVs as UTF-8; Lesson 3 mentioned where Data Loader's version of that setting lives.

## A pre-flight checklist

1. **Header row present**, with one column per field you intend to map.
2. **Row lengths match** — no row with more or fewer commas than the header.
3. **Dates in one consistent format**, ideally `yyyy-MM-dd`.
4. **Commas inside values are quoted.**
5. **File saved as UTF-8**, especially if any value has an accented or non-English character.
6. **No stray blank rows** at the end of the file — some tools treat a trailing blank row as a record and error on it.

## Try it yourself

Open a spreadsheet program, build a five-row CSV for fake Lead records with at least one company name containing a comma (quoted) and one date field. Save it as CSV UTF-8, then open the raw file in a plain text editor to confirm the comma-containing value is wrapped in quotes and the file looks the way you expect.

## Recap

- Both the Import Wizard and Data Loader run on CSV files — a clean file prevents most load failures.
- Use `yyyy-MM-dd` for dates, consistent booleans, and 18-character IDs for update/upsert files.
- Quote any value containing a comma, and save the file as UTF-8.
- A short pre-flight checklist catches the mistakes that cause silent data corruption.

## Check yourself

A load finishes "successfully," but half the records have company names and phone numbers swapped into the wrong fields. In one sentence, what's the most likely cause in the source CSV?
