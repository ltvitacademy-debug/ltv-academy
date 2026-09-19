# Script — Loading Data Into Redshift: the COPY Command

## Segment 1 (title)

Redshift is a warehouse you load data into, and the tool for that is almost never a plain SQL INSERT — it's the COPY command, Redshift's purpose-built bulk loader.

## Segment 2 (code: the COPY command)

A basic COPY points FROM at an S3 location, uses an IAM role Redshift assumes to read that data, and a FORMAT AS clause telling it how to parse the files — Parquet, CSV, JSON, and more are all supported.

## Segment 3 (steps: COPY vs. row-by-row INSERT)

A plain INSERT runs through the leader node sequentially, one statement at a time. COPY works completely differently — it hands the source file list out to load in parallel across every compute node's slices at once. And when you need an exact, known set of files instead of just "whatever's in this prefix," a manifest file lists them explicitly and can fail the whole load loudly if one is missing.

## Segment 4 (outro)

Loading data with COPY down. Next up: distribution and sort keys — how Redshift actually lays your data out across nodes, and why getting that choice wrong causes real performance problems.
