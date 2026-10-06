# Script — The Import Wizard

## Segment 1 (title)

The Data Import Wizard is the fastest way to get a modest batch of records into Salesforce without installing anything. Let's walk the flow end to end, on the same screens you'll use in a real org.

## Segment 2 (screenshot: launch wizard)

From Setup, search Data Import Wizard in Quick Find and launch it. The wizard breaks the job into three real steps: choose data, edit mapping, and start import, with prepping your data as the step before any of this even opens.

## Segment 3 (screenshot: edit field mapping)

Once you've chosen your file, the wizard tries to auto-match your CSV's column headers to Salesforce fields. Most columns map themselves. Anything it can't confidently match gets flagged Unmapped, like Address Line 1 here — click Map, search for the right field, and confirm.

## Segment 4 (steps: choose, map, confirm zero unmapped)

So the flow is: choose your data, object, operation, and file; fix anything flagged Unmapped in the mapping step; and confirm you're at zero unmapped fields before you move on.

## Segment 5 (screenshot: review and start import)

The last step is a straightforward summary — object, operation, file, and a count of mapped versus unmapped fields. Fifteen mapped, zero unmapped is exactly what you want to see here before clicking Start Import.

## Segment 6 (screenshot: import started confirmation)

The import doesn't run synchronously. Clicking Start Import queues an asynchronous job and hands you this confirmation. Click OK to jump to the Bulk Data Load Job page, where you track status and download the success and error files once it finishes.

## Segment 7 (steps: the wizard's limits)

The wizard does have real limits: fifty thousand records per job, a fixed list of supported objects — no Opportunities, no Cases — and duplicate matching limited to name, site, or email, not a custom rule.

## Segment 8 (outro)

When a job falls outside any of those limits, that's your cue to reach for Data Loader instead. Next up, Data Loader concepts.
