# Inserting & Updating Records

Exporting is read-only. **Insert** and **Update** are where Data Loader starts changing your org, so this lesson is as much about care as about clicks. The mechanics are simple: a CSV file goes in, and Salesforce creates or changes records.

## What you'll learn

- How Insert loads new records from a CSV
- How Update finds existing records by **Id**
- How field mapping connects CSV columns to Salesforce fields

## Insert: new records from a CSV

An Insert creates one new record for every row in your CSV. The column headers tell Data Loader which field each value belongs to:

```text
Name,Industry,Phone
Northwind Traders,Retail,555-0101
Contoso Ltd,Technology,555-0102
```

Two things to remember. Include every field the object **requires**, or those rows will fail. And **do not include an Id**: Salesforce generates the Id for each new record itself.

## Update: matched by Id

An Update changes records that already exist, and the way Data Loader finds them is the record **Id**. Every row in the CSV must have one:

```text
Id,Phone
001xx000003DGb2AAG,555-0199
001xx000003DGb3AAG,555-0142
```

Only the columns you **map** are written. A field that is not in the file, or is not mapped, keeps its current value. A very common workflow is to **export** the records first (with their Ids), edit the values in the CSV, and load the file back as an Update. Recall the **Insert Null Values** setting from the first lesson in this chapter: with it on, blank cells clear existing data.

## Field mapping

After you choose your CSV, Data Loader shows a mapping screen that pairs each column with a Salesforce field:

- **Auto-Match Fields to Columns** pairs the ones whose names line up.
- You fix or add the rest by hand, and you can leave a column unmapped to ignore it.
- A mapping can be saved to a file and reused for repeat loads.

## Read the results

When the operation finishes, Data Loader writes two CSV files: a **success file** and an **error file**. The success file for an Insert includes the new record Ids. The error file lists every failed row with the reason, and this is the file to read, fix and reload. Do not assume a load worked because the wizard finished.

## Key terms

| Term | Meaning |
|---|---|
| Insert | Creates a new record for each CSV row |
| Update | Changes existing records, matched by Id |
| Field mapping | The pairing of CSV columns to Salesforce fields |
| Success file | CSV of rows that loaded, including new Ids for inserts |
| Error file | CSV of rows that failed, with the reason |

## Check yourself

You exported 400 Contacts with their Ids, corrected the Phone column in the CSV, and want to load the fixes. Which operation do you use, which columns must be in the file, and what do you do first if this is your first time?
