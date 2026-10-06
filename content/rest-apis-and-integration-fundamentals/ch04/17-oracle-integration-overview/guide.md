# Lesson 17 — Oracle Integration Overview

**Chapter 4 · Integration Patterns · Lesson 17 of 19**

## What you'll learn

- What Oracle Integration Cloud (OIC) is and why it exists
- The three parts of an OIC integration flow: trigger, transform, deliver
- How OIC's ERP Cloud adapter relates to the raw REST calls this course has covered
- The practical difference between OIC Standard and Enterprise editions

## What OIC is

**Oracle Integration Cloud (OIC)** is Oracle's own **iPaaS**
(integration platform as a service) for designing, running, and
monitoring integrations through a visual interface. Rather than
hand-coding every REST call this course has covered, a developer
builds an OIC **integration flow** that handles authentication,
mapping, and delivery through configuration.

OIC's **ERP Cloud adapter** already understands how to talk to Fusion
Financials' REST resources — it's the practical bridge between the
raw calls this course has taught and a production-grade integration.

## Three parts of an integration flow

1. **Trigger** — what starts the flow: a schedule, an inbound call
   from another system, or a Fusion **business event** (Lesson 18).
2. **Transform** — mapping fields between Fusion's data shape and
   whatever shape the target or source system expects.
3. **Deliver** — calling the target system, or calling Fusion's own
   REST API to write data in.

OIC also provides built-in **monitoring**, tracking whether a given
run succeeded, failed, or is still in progress — critical for
diagnosing a failed overnight integration without starting from zero.

## Standard vs. Enterprise edition

| Standard Edition | Enterprise Edition adds |
|---|---|
| SaaS integration adapters | On-premises enterprise application adapters |
| Technology adapters (REST, SOAP, FTP, etc.) | Process automation |
| File Server | B2B capabilities |
| Visual Builder | Integration Insight |

Which edition a client has licensed is a practical constraint on what
integration approaches are actually available to design.
## Key terms

| Term | Meaning |
|---|---|
| OIC | Oracle Integration Cloud — Oracle's iPaaS for building and monitoring integrations |
| ERP Cloud adapter | OIC's built-in adapter for talking to Fusion Financials/SCM REST resources |
| Integration flow | An OIC-built sequence of trigger, transform, and deliver steps |
| iPaaS | Integration Platform as a Service — a cloud platform for building integrations |

## Check yourself

Explain, in your own words, how OIC's ERP Cloud adapter relates to the raw GET/POST/PATCH REST calls this course has taught — is OIC a replacement for understanding those calls, or something built on top of them?
