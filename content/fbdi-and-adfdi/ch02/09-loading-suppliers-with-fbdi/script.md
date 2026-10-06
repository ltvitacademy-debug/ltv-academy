# Script — Loading Suppliers with FBDI

## Segment 1 (title)

Time to put chapter two together into one complete, worked example. Supplier Import is one of the most common first FBDI loads a new implementation runs, because almost nothing in Payables or Procurement can happen until suppliers exist in the system.

## Segment 2 (steps)

Picture a project team converting twenty-five active suppliers from a legacy system ahead of go-live. They download the Supplier Import template. Each row is one supplier — name, a unique supplier number, supplier type, address and site details. Supplier type is a coded lookup, so they check the valid values first, before typing anything.

## Segment 3 (code)

With all twenty-five rows entered and no sample rows left behind, they generate the CSV files from the Instructions tab macro and zip the output. Two data tabs — supplier and site — become two CSV files, bundled into one zip, exactly like any other FBDI load.

## Segment 4 (steps)

The zip uploads into the account scoped to supplier imports, not payables or GL. Load Interface File for Import stages the twenty-five rows into the supplier interface tables. Then the supplier-specific import process validates each one — unique supplier number, valid type code, required address fields — and creates a real, active supplier record for every row that passes.

## Segment 5 (outro)

Suppose twenty-three of twenty-five import successfully, and two are rejected — one for a duplicate supplier number, one for an invalid type code typed as a label instead of the code. Both trace back to specific, nameable causes. Up next, Chapter three: running imports — the mechanics of uploading, loading interface tables, and monitoring the processes that do the real work.
