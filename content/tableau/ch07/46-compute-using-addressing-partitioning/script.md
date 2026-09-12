# Script — Compute Using: Addressing & Partitioning

## Segment 1 (title)

Every table calculation you've built this chapter has secretly been asking the same question about every dimension in your view: is it part of the calculation's direction, or part of its scope? Those two roles have names — addressing and partitioning — and this lesson pulls back the curtain on both.

## Segment 2 (screenshot: compute using dialog)

Under Specific Dimensions, checking a dimension makes it addressing — it's part of the direction the calculation moves through. Leaving it unchecked makes it partitioning — the view breaks into separate scopes at that dimension, and the calculation restarts fresh inside each one. Here, Quarter and Month are checked as addressing; Year is left unchecked as partitioning.

## Segment 3 (screenshot: table across)

Table (Across) is really just a preset for this same split: it addresses whatever's on Columns and partitions by whatever's on Rows. Watch the highlighted arrow move left to right across one row before restarting on the next.

## Segment 4 (screenshot: table down)

Table (Down) flips it — addressing Rows, partitioning by Columns. The same underlying mechanism, just aimed in the other direction. And if you've ever written a SQL window function with PARTITION BY and ORDER BY, you've already used both of these ideas under their SQL names.

## Segment 5 (outro)

That closes out table calculations. Next lesson opens Chapter 8 and a new topic entirely: understanding how Tableau's data model actually works.
