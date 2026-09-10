# Lesson 37 — Activator: Real-Time Alerting

**Chapter 2 · Real-Time Data Engineering · Lesson 37 of 70**

## What you'll learn

- Activator — Fabric's item for turning conditions into actions
- Objects and properties — how Activator models what it's watching
- Rules — the condition that triggers an alert
- Where Activator plugs into everything else in this chapter

## From routing to reacting

Lesson 36 ended with a "needs-review" branch — events routed
somewhere separate because something about them looked off. That
branch is useless without something watching it and actually doing
something when a condition is met. **Activator** is that something:
a Fabric item that watches a stream (or a Power BI report tile) and
fires an action — a Teams message, an email, a Power Automate flow
— when a rule you define comes true.

## Objects and properties

```
Object:     Trip
Properties: FareAmount, ArrivalGap, VendorId

Rule: FareAmount > 200  ->  notify #dispatch-alerts on Teams
Rule: ArrivalGap > 10m  ->  trigger a Power Automate flow
```

Activator models the world as **objects** with **properties** —
here, a `Trip` object with a `FareAmount` and an `ArrivalGap`
property, both fields you've already seen throughout this chapter.
Rules attach to properties: "when this property crosses this
threshold, do this."

## Rules — thresholds and changes

A rule can watch for a simple threshold (`FareAmount > 200`), or for
a *change* — a property that newly became true, rather than one
that's just sitting above a value continuously. That distinction
matters: without it, a fare that stays above $200 for an hour would
fire the same alert every time Activator re-evaluates it, instead of
firing once, when it actually crossed the line.

## Where Activator connects

```
Eventstream (Lesson 19) --routes to--> Activator
KQL Database (Lesson 21) --queried by--> Activator
Real-Time Dashboard (Lesson 28) --tile alerts--> Activator
```

Activator can watch an Eventstream directly, a KQL query's results,
or even a Power BI/Real-Time Dashboard tile — the same alerting
mechanism regardless of which upstream piece it's watching, which is
exactly why it sits as its own item type rather than being bolted
onto just one of them.

## Key terms

| Term | Meaning |
|---|---|
| Activator | The Fabric item that turns a rule into an action |
| Object / property | How Activator models what it's watching |
| Threshold vs. change | Firing continuously above a value vs. firing once when it crosses |

## Check yourself

You're ready for Lesson 38 when you can explain, without looking: why
would a rule that fires on every re-evaluation, instead of only on a
genuine change, cause a real problem in practice?
