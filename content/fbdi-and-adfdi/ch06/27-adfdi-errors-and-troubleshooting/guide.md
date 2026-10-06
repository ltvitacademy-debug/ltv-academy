# ADFdi Errors and Troubleshooting

Chapter 5 built a troubleshooting model for FBDI, organized around two validation layers and a reporting-and-log workflow. ADFdi needs its own version of that model, because its failures tend to look and feel completely different, even when the underlying cause is conceptually similar.

## What you'll learn

- The category of problems unique to ADFdi: the tool not working at all
- The category of problems ADFdi shares conceptually with FBDI: business-rule rejections
- Why ADFdi's validation feedback is immediate rather than report-based
- A short troubleshooting checklist specific to this tool

## Category one: the tool doesn't work at all

This is the ADFdi-specific failure mode from lesson 24's prerequisites list, and it's usually the first thing to rule out: a missing or outdated Excel add-in, macros disabled, or the add-in blocked by security settings. The telltale sign is that nothing related to actual data ever gets a chance to matter — the ribbon doesn't appear, a "Create ___ in Spreadsheet" action does nothing when clicked, or the upload button in the spreadsheet produces no response at all. None of this is a data problem; all of it is an environment/setup problem, and the fix is always back in lesson 24's checklist: confirm the add-in is installed and current, confirm macros are enabled, confirm the add-in isn't sitting in a blocked or untrusted state.

## Category two: the tool works, but a row is rejected

Once the tool itself is functioning, ADFdi can still reject entered data for the same conceptual reasons FBDI does — an invalid account combination, a journal batch that doesn't balance, an invoice whose lines don't sum to its header. The business rules haven't changed; only the delivery mechanism for the error has. Where FBDI surfaces this in a scheduled process report reviewed later, ADFdi typically surfaces it directly in the spreadsheet, often as an inline message or a status flag on the specific row, visible before the user has even left the session.

## Why ADFdi's feedback loop is different

This immediacy is both a strength and a trap. It's a strength because a user fixes a typo and re-submits within the same minute, with no waiting on a scheduled process. It's a trap because that same immediacy can tempt a user into resubmitting the *entire* spreadsheet after fixing one row, rather than the specific corrected rows only — the exact mistake lesson 21 warned against for FBDI, reappearing here in a faster, more tempting form. The discipline is the same regardless of tool: fix only what actually failed, and only resubmit that.

## A short ADFdi troubleshooting checklist

If the tool won't launch or upload at all: check the add-in installation, macro settings, and trust/security settings first, before assuming anything about the data. If the tool launches and uploads but specific rows are rejected: read the inline error or status exactly as written, trace it back to a business rule you already know from Chapters 4 and 5 (balancing, existence, totals), and correct only that row before resubmitting.

## Recap

ADFdi failures split into two categories: the tool itself not functioning, which traces back to installation and security prerequisites, and individual rows being rejected for the same business reasons FBDI rejects them, just surfaced immediately rather than in a later report. The old discipline — fix narrowly, resubmit narrowly — still applies, even though the feedback now arrives faster. Next up, the final lesson of this course: choosing between FBDI, ADFdi, and manual entry.
