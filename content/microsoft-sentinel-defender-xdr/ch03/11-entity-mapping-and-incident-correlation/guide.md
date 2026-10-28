# Lesson 11 — Entity Mapping and Incident Correlation

**Chapter 3 · Analytics Rules & Detection Engineering · Lesson 11 of 32**

## What you'll learn

- What **entity mapping** is: telling Sentinel which columns in a query's results represent real entities — an Account, a Host, an IP address
- Where entity mapping lives in an analytics rule, and what an entity mapping actually looks like underneath the UI
- Why entity mapping is what powers the investigation graph and lets Sentinel correlate activity across incidents
- What an incident looks like when entity mapping is missing, and why that makes investigation harder

## A query returns columns; Sentinel needs entities

A scheduled rule's KQL query returns ordinary columns — `UserPrincipalName`, `IPAddress`, `DeviceName` — and to Sentinel, those are just text and numbers unless you tell it otherwise. **Entity mapping**, configured on an analytics rule's "Set rule logic" tab, is exactly that: a mapping from a query column to a recognized entity type — **Account**, **IP**, **Host**, **URL**, **FileHash**, **Mailbox**, and others — with an **identifier** that says what that column actually represents for that entity (an Account's identifier might be `FullName` or `Name`; an IP's identifier is `Address`). Once mapped, that column isn't just a string anymore — it's a tracked object Sentinel can follow across every alert and incident it appears in.

## What an entity mapping looks like

Underneath the UI, an entity mapping is stored as structured data on the rule itself. A rule watching sign-ins might map two entities like this:

```
entityMappings: [
  { entityType: "Account",
    fieldMappings: [
      { identifier: "FullName", columnName: "UserPrincipalName" }
    ] },
  { entityType: "IP",
    fieldMappings: [
      { identifier: "Address", columnName: "IPAddress" }
    ] }
]
```

Every alert this rule generates now carries a real Account entity and a real IP entity, not just two text columns that happen to look like a username and an address.

## Why this is what makes correlation possible

This is the mechanism behind two things Chapter 6 covers in depth: the **investigation graph** (a visual map of how an incident's entities connect to other alerts, sign-ins, and activity) and Sentinel's ability to group or link incidents that share the same entity. Neither is possible without entity mapping — Sentinel can't know "this incident's user is the same user as that other incident" unless both rules mapped the same column to the same Account entity in the first place. Entity mapping is what turns "two unrelated-looking alerts" into "the same account, showing up twice," which is the entire point of correlating detections into a coherent incident instead of a pile of disconnected alerts.

## What's missing without it

An analytics rule with no entity mapping still generates alerts — but each one is just its raw query output, rendered as a flat table of columns. There's no entity page to open, no investigation graph to expand, and no way to ask "show me every other incident involving this account" with one click. An analyst has to read the raw fields and manually go hunting for related activity instead. Entity mapping isn't cosmetic — it's the difference between an alert and an investigable incident.

## Key terms

| Term | Meaning |
|---|---|
| Entity mapping | Telling Sentinel which query column represents a real entity (Account, IP, Host, etc.) |
| Entity type | The category of entity being mapped — Account, IP, Host, URL, FileHash, Mailbox, and others |
| Identifier | What a mapped column represents for that entity type, e.g. Account's `FullName` or IP's `Address` |
| Investigation graph | The visual map of how an incident's entities connect to other activity, built from entity mapping |

## Check yourself

Without looking back: if two different analytics rules both detect suspicious activity for the same user, but only one of them has `UserPrincipalName` mapped to an Account entity, what happens to Sentinel's ability to connect those two alerts?
