# Lesson 22 — Business Domains · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This chapter closes with business domains — the boundary that groups everything else we've built so far: data products, glossary terms, and more, under one owned, named home.

## S2 · STEPS — What a domain organizes

A business domain organizes four business concepts. Data products — packaged sets of tables, files, or reports. Glossary terms — the business vocabulary, scoped to this domain. OKRs — objectives and key results describing the measurable value this domain's data delivers. And critical data elements — logical groupings of important columns that need elevated governance. None of these mean much floating on their own. A domain gives them a shared home and a shared owner.

## S3 · SCREENSHOT — A domain-free tenant

Quick naming note first: Microsoft shipped this as "Business domains," which is what you're seeing here — a brand-new tenant's empty Business domains screen. Newer docs and screens increasingly call the same feature a "governance domain." Same feature, same five types, same rules — just don't be thrown by the newer name.

## S4 · SCREENSHOT — Creating one

Creating a domain means a name, a description, a type, and optionally a parent domain. Here we're creating "Claims Management" as a Functional unit, nested under "Claims." Domains can nest up to five levels deep, and a tenant can hold up to two hundred of them — deep enough to be useful, bounded enough to stay readable.

## S5 · STEPS — Five types, one structure

The type you pick — Functional unit, Line of business, Data domain, Regulatory, or Project — is purely descriptive. It tells a reader why the boundary exists. It changes nothing about how the domain behaves under the hood. A Regulatory domain for GDPR and a Functional unit domain for Finance work identically.

## S6 · SCREENSHOT — A domain doing real work

This is "Fraud Services," a Regulatory domain nested under Finance, fully built out: type, parent, seven owners, Published status, and all four business concepts as clickable cards — four data products, nine glossary terms, one OKR, one critical data element. This is a domain's full home page.

## S7 · SCREENSHOT — Drilling into an OKR

Selecting a business-concept card drills in. Here's the OKRs list for a Human Resources domain — one real objective, "Revamp hiring guidelines to accelerate interview processes," with four key results, a target date, and an "At risk" progress state. That's what business value looks like as tracked data, not a slogan on a slide.

## S8 · OUTRO

That closes Chapter Four. Chapter Five is lineage — tracing exactly where data came from and everywhere it went.
