# Enterprise Structure Design Principles

Chapter 1 gave you the map. Before we start placing pins on it — actually creating legal entities and ledgers in Chapter 2 — this lesson covers the questions a consultant has to answer *before* opening a single setup task. Enterprise structure design is a planning exercise first and a configuration exercise second.

## What you'll learn

- The core questions that drive enterprise structure design
- Why "fewer, simpler structures" usually beats "more flexibility just in case"
- How legal, managerial, and reporting requirements can pull design in different directions
- A short checklist to run through before configuring anything in later chapters

## The questions that drive the design

Every real Oracle Fusion engagement starts enterprise structure design by answering a small set of questions, because the answers determine how many legal entities, ledgers, business units, and charts of accounts the company needs:

```
1. How many legally registered companies does the business operate as?
2. In how many countries, with how many statutory reporting requirements?
3. How many different functional/reporting currencies are involved?
4. Does management need to see results in groupings different from the legal structure?
5. Will any entities need a different accounting calendar or chart of accounts?
```

A single-country, single-currency company with one legal entity rarely needs more than one primary ledger and one chart of accounts. A multinational holding company with a dozen subsidiaries across different countries and currencies may need several ledgers, a shared chart of accounts, and careful decisions about which legal entities share a ledger and which get their own.

## Fewer, simpler structures beats more flexibility

A common mistake, especially from consultants newer to Oracle Fusion, is over-engineering: creating extra ledgers, extra charts of accounts, or extra business units "in case we need them later." Every extra structure is something that must be configured, maintained, reconciled, and explained during reporting, forever. The guiding principle this course will repeat: **start with the simplest structure that satisfies today's legal, tax, and reporting requirements**, and only add complexity when a specific, real requirement demands it — not a hypothetical one.

## When legal, managerial, and reporting needs pull apart

Sometimes the structure that satisfies statutory (legal) reporting is not the same structure management wants to see for decision-making. For example, a legal entity might be required to report standalone financial statements to a government, while management actually wants to see results grouped by product line across several legal entities. Oracle Fusion has specific tools for exactly this tension — segment values and hierarchies for management views, secondary ledgers or reporting currencies for alternate accounting representations — but naming the tension during design, rather than discovering it mid-build, is what separates a smooth implementation from a painful one.

## A design checklist

```
Before configuring anything:
  [ ] List every legal entity the business actually operates as
  [ ] Confirm each entity's country, currency, and statutory calendar
  [ ] Decide which legal entities will share a ledger, and which need their own
  [ ] Decide on one shared chart of accounts design, if at all possible
  [ ] Identify any management reporting views that differ from the legal structure
```

## Recap

Enterprise structure design means answering how many legal entities, currencies, and reporting requirements a business has, before opening any setup screen, and defaulting to the simplest structure the requirements allow. Next up, lesson 6: legal entities and legal reporting units, the first structure we will actually build.
