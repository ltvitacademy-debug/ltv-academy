# Lesson 17 — Oracle Integration Overview · Voiceover script

Segments map 1:1 to slides. Chapter 4 · Integration Patterns · Lesson 17 of 19.

---

## S1 · TITLE CARD

Everything in this course so far has been about the REST calls themselves. In a real implementation, those calls rarely get hand-coded — they're built and orchestrated inside Oracle Integration Cloud, OIC, Oracle's own integration platform.

## S2 · STEPS CARD

OIC is an iPaaS — an integration platform as a service — for designing, running, and monitoring integrations through a visual interface rather than raw code. A built-in ERP Cloud adapter already knows how to talk to Fusion's REST APIs, handling authentication and resource shapes so a developer doesn't rebuild that from scratch for every integration. Built-in monitoring tracks whether each run succeeded, failed, or is still in progress, which matters enormously when something goes wrong at two in the morning.

## S3 · STEPS CARD

An OIC integration flow has three parts, in order. A trigger starts it — a schedule, an inbound call from another system, or a Fusion business event, which the next lesson covers. A transform step maps fields between Fusion's data shape and whatever shape the other system expects. And a delivery step actually calls the target system, or calls Fusion's own REST API.

## S4 · CODE CARD

Oracle sells OIC in two editions, and which one a client has actually changes what's possible to build. Standard Edition includes SaaS and technology adapters, a file server, and Visual Builder. Enterprise Edition adds on-premises adapters, process automation, B2B capabilities, and Integration Insight for deeper visibility into a running flow.

## S5 · OUTRO CARD

OIC is where the REST calls this course has built get orchestrated, scheduled, and monitored in a real implementation. Next lesson looks at one specific kind of trigger OIC can react to: a business event Fusion raises on its own, the moment something happens.
