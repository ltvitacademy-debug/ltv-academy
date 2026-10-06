# Lesson 9 — Setting Up Category Defaults · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 4 introduced category books conceptually. This lesson is about actually configuring them — the task done before a single real asset is added.

## S2 · STEPS — What a category book record sets

For every category used in a book, someone configures a record with the depreciation method, the life in months, the prorate convention, a salvage value percentage, and default cost, clearing, and depreciation accounts.

## S3 · STEPS — Defaults versus overrides

These fields default onto a new asset the moment its category is selected, but defaults aren't walls. A person adding an asset manually can override the life or method for that one asset, if there's a genuine reason. Defaults exist to make the common case fast, not to remove flexibility.

## S4 · STEPS — Same category, different books

Because category books are configured per book, the same category — say, Machinery — gets its own independent record in the corporate book and in each tax book. Straight-line in corporate, an accelerated method in tax: two records, one category.

## S5 · STEPS — Design and defaults work together

A category structure that's too coarse forces constant manual overrides, which defeats the whole purpose of having defaults. Getting category defaults right before go-live avoids painful cleanup later.

## S6 · OUTRO

Next lesson: tax books and corporate books, and exactly how that mass copy process keeps them in sync.
