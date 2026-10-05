# Lesson 6 — Source Systems and Extraction · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter 1 defined lineage in the abstract. Chapter 2 traces an actual record through an actual pipeline, hop by hop — starting here, at source systems and extraction.

## S2 · STEPS — SOURCE SYSTEM TYPES

Almost every pipeline pulls from one of three categories. OLTP databases, written in real time by an application. SaaS and API sources, where you only get what the vendor's API chooses to expose. And files and streams — scheduled drops or continuous event feeds. Each one constrains what lineage metadata is even available at the source.

## S3 · STEPS — EXTRACTION METHODS

Four common extraction methods. Full extract pulls everything, every time — simple, but it can't tell you what changed. Incremental extract pulls only new or changed rows. Change Data Capture reads the database's own transaction log, capturing every insert, update, and delete in order — the richest lineage source there is. And API pull is bounded entirely by what the vendor's endpoint tracks.

## S4 · CODE — LINEAGE'S POINT ZERO

Every later hop in this chapter can only be as trustworthy as what gets recorded right here. If an extraction job doesn't tag each row with its source, method, and run, there's no way to answer "where did this come from" three hops later — and you can't recover that after the fact.

## S5 · OUTRO

Next lesson: what happens to a row after it lands — ETL and ELT lineage, and why the shift between them changes how lineage gets captured.
