# Lesson 15 — Integrating Catalogs Across Platforms · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Most real organizations don't end up with one catalog. They end up with several. This lesson is about why that happens, and how to connect them anyway.

## S2 · STEPS — Why multiple catalogs happen

Every platform you adopt ships its own native catalog, scoped to its own objects. Run more than one platform, and you have more than one catalog — each authoritative for its own world, none aware of the others. That's not a planning failure. It's the predictable result of adopting more than one platform.

## S3 · STEPS — Three integration patterns

Three ways to connect them. A federation hub — one catalog that pulls from each platform's own catalog and presents one search surface on top. Pull-based sync — periodically copy metadata on a schedule, simple but goes stale between pulls. API-based federated search — query every platform live, no staleness, but slower and dependent on every platform being up.

## S4 · STEPS — What doesn't transfer

A tag or permission set inside one platform's catalog doesn't automatically become the equivalent inside another's — nothing translates it unless something's built to. Most real integration projects spend most of their effort right here, mapping one platform's concepts onto another's, not building the search screen.

## S5 · STEPS — Back to the operating model

A federated or data-mesh operating model from Chapter Two usually keeps platform-native catalogs authoritative at the domain level, with a lighter hub above them. A centralized model is more likely to push toward consolidating onto one catalog platform directly. Same decision, now visible at the catalog layer.

## S6 · OUTRO

Next lesson closes this chapter: active metadata — what happens when metadata doesn't just sit there, but actually triggers something.
