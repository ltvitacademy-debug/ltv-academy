# Lesson 12 — Scan Troubleshooting · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every registered source has a View Details button that takes you straight into its scan status — that's where troubleshooting starts.

## S2 · SCREENSHOT (view scan)

From the map view, View Details on any source opens its scan history directly.

## S3 · SCREENSHOT (manage scan)

Select the scan's name from there, and you're looking at its full run history — every past run, its status, its asset counts.

## S4 · SCREENSHOT (manage scan options)

Run scan now, Edit scan, Delete scan — all one click away. Edit is where you'd change the schedule or scope without starting over.

## S5 · STEPS CARD (connection checklist)

If a scan can't connect: recheck the source's prerequisites, confirm the authentication method actually matches what's configured on the source side, and review Azure RBAC — some roles sound broad but don't actually grant Reader access.

## S6 · SCREENSHOT (verify minimum permissions)

If you're authenticating through a stored secret, check Key Vault too. The Purview managed identity needs at least Get and List on Secrets — missing from the access policy list entirely is usually the actual problem.

## S7 · STEPS CARD (scans that used to work)

If a scan that used to succeed suddenly fails: have credentials rotated? Is an Azure Policy blocking storage updates? Is a self-hosted integration runtime out of date? And if Test connection passes but the scan itself still fails, that usually points at a network setting, not credentials.

## S8 · OUTRO CARD

That closes out the Data Map chapter. Next: classifications — how Purview actually tags the data all this scanning found.
