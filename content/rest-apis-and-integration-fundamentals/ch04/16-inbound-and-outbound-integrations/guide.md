# Lesson 16 — Inbound and Outbound Integrations

**Chapter 4 · Integration Patterns · Lesson 16 of 19**

## What you'll learn

- The difference between an inbound and an outbound integration
- How HTTP verbs typically (though not always) line up with direction
- Real Financials examples of inbound and outbound integrations
- Why pattern (batch/real-time/event-driven) and direction are independent decisions

## Direction is a separate dimension from pattern

**Inbound** — an external system creates or updates records *inside*
Fusion. **Outbound** — an external system reads or extracts data
*from* Fusion. Direction is independent of pattern: an inbound
integration can be batch, real-time REST, or event-driven, and the
same is true outbound.

## How this looks in REST terms

```
Inbound:  external system -> POST /invoices
            (vendor portal creates an AP invoice)

Outbound: external system -> GET /journals
            (data warehouse pulls GL entries nightly)
```

As a rule of thumb (not an absolute one): an external system calling
`POST`/`PATCH` against Fusion is writing data in (inbound); an
external system calling `GET` against Fusion is reading data out
(outbound).

## Common Financials scenarios

| Direction | Example |
|---|---|
| Inbound | A bank statement feed creates cash transactions in Cash Management |
| Inbound | A vendor portal creates AP invoices |
| Outbound | A BI/reporting tool extracts AP aging and GL balances nightly |
| Outbound | A tax engine pulls invoice and tax-line details |

Many real implementations run **both** directions for the same
module — invoices flowing in from a vendor portal while aging data
flows out to a reporting layer — because inbound and outbound serve
entirely different business needs.
## Key terms

| Term | Meaning |
|---|---|
| Inbound integration | An external system creates or updates data inside Fusion |
| Outbound integration | An external system reads or extracts data from Fusion |
| Direction | Whether data moves into or out of Fusion — independent of batch/real-time/event-driven pattern |

## Check yourself

A client wants a nightly feed pulling GL journal balances into a corporate reporting warehouse, and separately wants a vendor portal to create AP invoices directly in Fusion. Label each as inbound or outbound, and explain your reasoning.
