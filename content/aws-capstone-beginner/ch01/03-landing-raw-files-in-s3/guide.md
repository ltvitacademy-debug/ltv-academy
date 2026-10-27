# Landing Raw Files in S3

**Chapter 1 · Beginner Capstone: First Look at the Files · Lesson 3 of 10**

## What you'll learn

- The real bucket and prefix the August order files are sitting in
- What's actually inside each CSV — the columns and a sample row
- Why this project starts with a flat, unpartitioned prefix (and what that costs later)

## Confirming what's already there

Before the Glue Crawler can do anything, confirm exactly what it will be pointed at. The
Operations Manager's one-off upload landed in the same raw-zone bucket IT already
provisioned for Northfield, under its own prefix:

```
s3://northfield-raw-zone/orders-raw/orders_2026-08-01.csv
s3://northfield-raw-zone/orders-raw/orders_2026-08-02.csv
...
s3://northfield-raw-zone/orders-raw/orders_2026-08-31.csv
```

Thirty-one files, one per day of August 2026, all sitting flat in the same
`orders-raw/` prefix — no subfolders, no date partitioning yet. That's deliberate: this is
the simplest possible layout, and Lesson 8 comes back to show exactly what it costs once
the data grows.

## What's inside each file

Each CSV is one day's worth of order line items, exported straight from the on-prem SQL
Server:

```
order_id,order_date,product_category,product_name,quantity,unit_price,customer_region
10482,2026-08-01,Tents & Shelters,Ridgeline 2P Tent,1,189.99,Southeast
10483,2026-08-01,Camp Kitchen,Folding Camp Stove,3,34.50,Midwest
10484,2026-08-01,Footwear,Trailblazer Hiking Boots,2,79.00,Southeast
```

Seven columns: `order_id`, `order_date`, `product_category`, `product_name`, `quantity`,
`unit_price`, and `customer_region`. That's everything the stakeholder's question needs —
`product_category`, `quantity`, and `unit_price` are exactly what Lesson 7's query will
aggregate.

## Checking the upload, the simple way

There's no automated ingestion job here — no scheduled task, no `_SUCCESS` marker, no
Step Functions checking for completeness. That machinery belongs to a recurring pipeline,
and this is a one-time manual upload. For a one-off like this, checking the upload means
confirming, by hand, that all 31 files are present and none are empty:

```
aws s3 ls s3://northfield-raw-zone/orders-raw/ --summarize --human-readable
```

The `--summarize` flag prints a total object count and total size at the bottom of the
output — a quick sanity check that August's 31 days all made it in, and that nothing is a
suspicious 0 bytes.

## Why flat, unpartitioned, for now

It would be possible to upload these files already organized by date
(`orders-raw/dt=2026-08-01/...`), but this project starts with the plainest layout on
purpose. A flat prefix is the natural starting point for a one-off ask against a single
month of data, and it's the honest state most "someone just dumped files in S3" situations
are actually in. Lesson 8 picks this exact prefix back up to show what changes, and why,
once the question needs faster or cheaper repeated access.

## Key terms

| Term | Meaning |
|---|---|
| Prefix | The S3 "folder path" portion of an object's key — here, `orders-raw/` |
| Object | A single file stored in S3, identified by its full key (bucket + prefix + filename) |
| Flat layout | All files in one prefix, with no subfolder structure by date or category |
| `aws s3 ls --summarize` | CLI flag that prints total object count and size for a prefix |

## Check yourself

Why does this project deliberately start with a flat `orders-raw/` prefix instead of
uploading the files already partitioned by date — and what question does that choice set
up for Lesson 8?
