# Lesson 30 — Data Quality Case Study: Financial Data · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This is it — the final lesson of Data Quality Management. Lesson thirty closes the course with one connected financial data case study, fictional company, real stakes.

## S2 · STEPS — THE SETUP

Ashgrove Components is a fictional manufacturer closing its books monthly. The general ledger and two subledgers are off by two hundred fourteen thousand dollars, and close is due in two days. No slack — the calendar doesn't move.

## S3 · STEPS — NAMING THE DIMENSIONS

The team doesn't guess. They name which dimensions could explain a reconciliation break: accuracy, a transaction posted wrong; completeness, invoices that never arrived; timeliness, an extract that ran too early; validity, a cost center code that doesn't exist.

## S4 · STEPS — PROFILING NARROWS IT DOWN

A row count comparison finds 44 missing transactions. A referential integrity check finds 12 with a retired cost center — validity. A timeliness check on the extract job's run time finds it fired before the day's last invoices posted, explaining the other 32.

## S5 · STEPS — ROOT CAUSE AND REMEDIATION

Five Whys lands on a process gap — a new product line's cost centers were never added to the GL's reference table. The fix works at three levels: re-post the affected transactions now, update the reference table and add a rule, and move the extract job later.

## S6 · STEPS — MONITORING AND CLOSURE

A monitor now tracks row-count parity daily, not just at month-end. A scorecard shows close readiness. The issue is logged, triaged, resolved, verified by re-running the parity check, and closed — with the process cause documented so it doesn't repeat.

## S7 · OUTRO

That's the whole course, working together on one real-shaped problem. Congratulations on finishing Data Quality Management — the Data Governance path continues next with Metadata Management and Business Glossary.
