# Lesson 8 — Decentralized Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Decentralized governance is next — and architecturally, it's the odd one out in this chapter, because it's mostly defined by what isn't there.

## S2 · STEPS — Defined by absence

This isn't a fourth reference-architecture pattern. It's the absence of one. Where centralized has a hub and federated has a catalog-of-catalogs, decentralized has no shared metadata layer connecting any of the domains at all.

## S3 · STEPS — Three gaps this produces

Three gaps result. No shared schema — the same kind of data gets tagged differently, or not at all, in different domains. No cross-domain lineage — the trail stops at the domain boundary. And no central audit trail — an enterprise-wide question means polling every domain separately.

## S4 · STEPS — Not every case is a mistake

Not every case is a mistake, though. Deliberate decentralization is genuinely unrelated business units choosing not to connect, because nothing needs to cross that boundary. Accidental decentralization is just the default when nobody architects anything at all.

## S5 · CODE — The architecture, drawn out

Drawn out, it looks like this: separate domain catalogs, each with their own schema or none at all, and no lines connecting any of them. That absence of connection is the entire architecture.

## S6 · OUTRO

Next lesson: data mesh governance — a model that's also distributed, but closes these exact gaps deliberately, through shared standards instead of a central system.
