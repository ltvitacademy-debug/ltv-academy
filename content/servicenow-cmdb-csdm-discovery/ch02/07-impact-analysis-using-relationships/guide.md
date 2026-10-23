# Lesson 7 — Impact Analysis Using Relationships

**Chapter 2 · Relationships & the Dependency View · Lesson 7 of 26**

## What you'll learn

- What "impact analysis" actually means in CMDB terms: walking the relationship graph from one CI outward
- Why a single hop isn't enough — transitive impact, and why it matters
- A real worked example of tracing impact from a failed server up to the business services it affects
- Why this exact mechanism is what makes Change Risk Assessment and CAB Conflict Detection meaningful, not decorative

## Impact analysis is a graph walk, not a guess

Lessons 5 and 6 built the real mechanism: typed, directional relationships in `cmdb_rel_ci`, visible as a graph through the Dependency View. **Impact analysis** is simply using that graph for its actual purpose — answering "if this CI goes down, what else is affected?" by starting at the failed CI and walking its relationships outward. If a specific server goes offline, querying its relationship graph for everything that **depends on** it (directly, and through further relationships from those CIs) tells you which applications, and ultimately which business services, are genuinely affected. This only works, though, if the relationships feeding the query are accurate — impact analysis built on missing or backward relationships produces a confident, wrong answer, which is worse than no answer at all because people will act on it.

## One hop usually isn't enough: transitive impact

A common mistake is checking only the CIs directly related to the failed one and stopping there. Real environments are rarely one hop deep. Consider a database server going down: the direct relationship might show that one application server depends on it. But that application server, in turn, might be a CI that a business service record depends on, and that business service might be the thing three different departments actually use day to day. The real impact — the thing that actually matters to "what's affected" — is at the far end of that chain, not the first hop. **Transitive impact** means following "depends on" relationships through multiple hops until you reach the business services and applications that real people notice when they stop working, not stopping at whatever CI happens to be one step away.

```
Direct relationship only (one hop):
  Database Server --used by--> App Server   [stops here — incomplete]

Transitive impact (full chain):
  Database Server --used by--> App Server --runs--> Order Application
                                             --supports--> Business Service: Online Ordering
```

## A worked example

Picture a database server scheduled for emergency maintenance. Querying its relationship graph shows: the "Order Processing" application server **depends on** this database; that application server **runs** the "Order Processing" application; and the "Order Processing" application, per its own relationship, **supports** the "Online Ordering" business service. Follow that chain and the honest answer to "what's affected if this database goes down" isn't "a database server" — it's "the Online Ordering business service, and everyone who relies on placing orders through it." That's the level of impact a business stakeholder, not just an infrastructure team, actually needs to hear.

## Why this makes other features actually work

This is not an abstract exercise confined to this chapter. A later course in this path, ServiceNow ITSM Implementation, builds **Change Risk Assessment** and **CAB Conflict Detection** — features that calculate how risky a planned change is, and flag when two changes scheduled around the same time might collide. Both of those features are only as good as the relationship data behind them. Change Risk Assessment asking "does this change touch a CI marked business-critical" and Conflict Detection asking "does this change affect the same CI as another scheduled change" are both, underneath, running the exact impact-analysis graph walk this lesson covers. If the relationships are missing, backward, or stale, those features will confidently miscalculate risk and silently miss real scheduling conflicts — not because the feature itself is broken, but because the CMDB data it depends on wasn't trustworthy to begin with.

## Key terms

| Term | Meaning |
|---|---|
| Impact analysis | Walking a CI's relationship graph outward to determine what's actually affected if that CI fails |
| Transitive impact | Impact that reaches through multiple relationship hops, not just the CI directly connected to the failed one |
| Business-critical CI | A CI flagged as supporting a service important enough that risk calculations treat changes to it with extra caution |
| Change Risk Assessment / CAB Conflict Detection | Later-course features that depend entirely on accurate relationship data to correctly identify real risk and real scheduling conflicts |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why does stopping impact analysis at the first relationship hop understate the real impact of a failed CI, and why does Change Risk Assessment's accuracy, two courses from now, actually depend on the relationship work covered in this lesson?
