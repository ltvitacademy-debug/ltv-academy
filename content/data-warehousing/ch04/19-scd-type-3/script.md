# Script — SCD Type 3

## Segment 1 (title)

SCD Type 3 sits between Type 1 and Type 2. It doesn't insert a new row like Type 2, and it doesn't throw the old value away like Type 1 — it adds an extra column specifically to hold the previous value.

## Segment 2 (screenshot: before and after)

Here's a real Microsoft example: salesperson Lynn Tsoflias moves from sales region 4 to region 5. There's still only one row, same surrogate key — but that row now carries two new columns: the previous sales region, and the date it stopped being current. The current region column simply becomes 5.

## Segment 3 (code: the extra-column pattern)

In SQL, one UPDATE statement captures the current value into the Previous column in the same moment it overwrites it with the new one. But that previous column only ever holds one value — if the region changes again next year, the fact it was ever region 4 is lost. That's why Microsoft's own guidance calls Type 3 uncommon, and suggests asking whether Type 2 would fit better before reaching for it.

## Segment 4 (outro)

Type 3 earns its place in one narrow case: comparing current versus immediately-previous in a single row, without a join. Next lesson, we combine these patterns on the same dimension — hybrid SCD.
