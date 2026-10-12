# Release Notes Template

Use this template for every release you simulate in this course's capstone (Lesson 7) or in any
real job. Keep it short and specific — "various improvements" tells a reader nothing.

---

## Release: [Short, specific title]

**Date:** [Release date]
**Environment:** [Production / UAT / Staging]

### Added
- [What shipped — describe the capability, not the ticket number]

### Changed
- [What behavior changed from before, if anything]

### Fixed
- [What bug or issue this release resolves, if any]

### Known limitations
- [Anything the audience needs to know that isn't fixed yet — be honest here]

### Who to contact
- [Who should be notified if something looks wrong after this release]

---

## Worked example (filled in, from this course's own capstone scenario)

## Release: Regional Revenue Dashboard — Daily Refresh

**Date:** 2026-01-14
**Environment:** Production

### Added
- Regional Revenue dashboard, showing revenue by region and by product category, refreshing
  automatically every morning at 7 AM.

### Changed
- N/A — first release of this dashboard.

### Fixed
- N/A — first release of this dashboard.

### Known limitations
- Product category data is only available back to January 2026; earlier months will show blank
  category breakdowns.
- A region with zero sales for the month displays as $0, not as a missing row — confirmed with
  the sales director this is the expected behavior, not a data error.

### Who to contact
- Data team on-call, via the #data-team-support channel, for any discrepancy in the numbers.
