# Mileage and Per Diem

Most expense types are entered as a receipt amount. Mileage and per diem are different: they are **calculated** from a rate schedule rather than typed in from a receipt, because the underlying cost (driving your own car, eating while traveling) doesn't produce a single clean receipt the way a hotel folio does. This lesson covers how both are set up and claimed.

## What you'll learn

- How mileage rate schedules work, and what can make a rate vary
- How per diem simplifies meals and incidentals into a fixed daily rate
- The difference between claiming per diem and claiming itemized meal receipts
- A worked example of each

## Mileage: paying for the use of a personal vehicle, not fuel

When an employee drives their own car for business, Oracle Fusion Expenses does not reimburse the price of gas. It reimburses a **per-mile rate** meant to cover fuel, wear, insurance, and depreciation together — the same logic behind a government-published standard mileage rate. A **mileage rate schedule** can be a single flat rate, or it can vary by:

- **Vehicle category or type** (a standard car versus a van or truck)
- **Number of passengers** — some policies pay a small bonus per additional passenger, since carpooling reduces overall company cost
- **Role** — a field technician's schedule might differ from a sales rep's

Castellan uses a single flat rate schedule company-wide, reviewed annually against the government-published standard rate, rather than varying by vehicle or role. The employee enters a starting point and destination (or a total mileage figure), and Expenses calculates the reimbursement automatically:

```
Mileage claim - Castellan standard rate
  Rate:          $0.67 / mile
  Trip:          Castellan regional office -> client site
  Distance:      38 miles round trip
  Reimbursement: 38 x $0.67 = $25.46
```

No receipt is required for a mileage claim, since there's nothing to photograph — the policy enforcement is the rate schedule itself plus an odometer or mapping-tool justification if Castellan's audit rules ask for one.

## Per diem: a fixed daily rate instead of itemized meals

**Per diem** replaces itemized meal and incidental receipts with a single fixed daily allowance tied to the travel destination and dates. Instead of Priya submitting three separate meal receipts a day for a four-day trip, Castellan can configure a per diem rate for her destination city, and she claims one daily amount automatically, with no receipts required for the per diem amount itself.

Per diem rate schedules are typically built by city or country, since the reasonable cost of a meal in a major city is different from a small town. Oracle Fusion Expenses supports **meal deductions** — if the conference Priya attends provides a included breakfast, the per diem for that day is reduced by the breakfast portion, since the company shouldn't pay twice for the same meal.

```
Per diem - Chicago, 4-day conference trip
  Full-day rate:         $74 / day
  Day 1 (travel day):    75% rate = $55.50
  Days 2-3 (full days):  $74.00 each
  Day 4 (breakfast provided, partial day): $74 - $18 breakfast deduction, 75% rate
```

## Choosing between per diem and itemized meals

A company picks one method per business unit or per trip type, not per employee whim — mixing both for the same trip creates duplicate claims. Castellan uses per diem for most domestic travel because it is simpler to audit (no receipts to check, just dates and destination) and uses itemized meal receipts for international trips, where actual costs vary too widely for a single schedule to be fair.

## Recap

Mileage reimburses the use of a personal vehicle through a per-mile rate schedule rather than a fuel receipt. Per diem reimburses meals and incidentals through a fixed daily rate tied to destination and dates, with deductions for provided meals, instead of itemized receipts. Both are calculated by the system from a rate schedule, not typed in from a document. Next up, lesson 8: cash advances, for when an employee needs money before a trip even starts.
