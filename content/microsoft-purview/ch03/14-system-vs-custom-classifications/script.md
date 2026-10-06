# Lesson 14 — System vs. Custom Classifications · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Purview ships with a huge library of system classifications already built in — but your organization's own data formats need something more.

## S2 · SCREENSHOT (system classifications list)

Here's the System tab: ABA Routing Number, All Full Names, national ID formats across dozens of countries, all under the reserved MICROSOFT namespace. If one of these fits, you never have to build anything.

## S3 · STEPS CARD (when you need custom)

System classifications can't know your organization's internal ID formats or product codes. That's what custom classifications are for — and you need Data Curator or Data Source Administrator permission on any collection to create one.

## S4 · SCREENSHOT (new classification button)

Start in Data Map, Annotation management, Classifications, and select plus New.

## S5 · SCREENSHOT (naming convention)

Name it using your company's namespace — contoso.hr.employee underscore ID becomes the friendly name Hr.Employee ID automatically. That namespacing keeps your custom classifications from colliding with anyone else's.

## S6 · SCREENSHOT (custom classification added)

Select OK, and it lands on your Custom tab. But a classification by itself is just a label — to have it actually applied during scans, it still needs a rule.

## S7 · STEPS CARD (two rule types)

Two ways to build that rule. A regular expression matches a data pattern, optionally a column name too. A dictionary rule matches against a file of known values you upload. Either way, custom rules only run against structured sources — never unstructured types like DOC or PDF.

## S8 · OUTRO CARD

Next lesson: sensitivity labels — a different kind of tag entirely, focused on protecting data rather than describing it.
