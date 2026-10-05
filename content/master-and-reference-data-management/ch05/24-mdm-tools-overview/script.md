# Lesson 24 — MDM Tools Overview · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every concept in this course gets implemented in an actual product
somewhere. This lesson names the real tools, and shows how one of them
structures a master data model using the exact vocabulary we've used
throughout this course.

## S2 · STEPS CARD (the landscape)

Informatica MDM, a long-standing multidomain platform built around a
central Hub. Reltio, a cloud-native, graph-based SaaS platform. SAP
Master Data Governance, tightly built into SAP ERP and S/4HANA. And
Microsoft SQL Server Master Data Services — removed starting SQL Server
2025, a reminder that tool landscapes shift under these concepts.

## S3 · SCREENSHOT (MDS Product model diagram)

This is Microsoft's own diagram of a Product model inside Master Data
Services. A model contains an entity, the entity carries attributes, and
one of them — Subcategory — is a domain-based attribute drawn from
another entity. Model, entity, attribute, hierarchy — a real shipped
product using this course's own vocabulary.

## S4 · STEPS CARD (evaluation criteria)

Compare tools on concrete criteria: domain coverage, whether it
supports the architecture style you actually chose, matching engine
configurability, which of the three integration mechanisms it supports,
ecosystem fit, and deployment and cost model.

## S5 · OUTRO CARD

A tool implements a strategy, it doesn't create one — pick the
architecture style, matching rules, and domains first. Final lesson
next: the MDM case study, pulling every chapter of this course together
into one scenario.
