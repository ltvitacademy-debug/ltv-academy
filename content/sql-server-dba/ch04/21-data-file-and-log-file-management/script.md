# Script — Data File & Log File Management

## Segment 1 (title)

This chapter goes underneath filegroups and database options, to physical storage itself. Data files and log files behave completely differently at the I/O level, and treating them the same is one of the most common storage mistakes a new DBA makes.

## Segment 2 (steps: two I/O patterns)

Data files see random I/O — pages read and written wherever the data happens to live. The log file sees sequential I/O, because write-ahead logging writes every change to the log first, in strict order, before the data page changes. Putting both on the same disk breaks up the log's sequential stream.

## Segment 3 (code: sizing the log correctly)

Internally the log file is divided into VLFs, virtual log files. A log that grew through many small autogrowth events ends up VLF-fragmented, slowing crash recovery and restarts. Size the log correctly upfront instead of letting it grow in small increments.

## Segment 4 (outro)

Separate physical disks for data and log isn't just performance — it protects your ability to do a tail-log backup if the data disk fails. Next up: tempdb configuration — the one system database every workload shares.
