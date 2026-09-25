# Script — Dynamic Dashboards

## Segment 1 (title)

Every dashboard has a running user, and the running user decides what data the dashboard shows. Understanding that is the key to dynamic dashboards.

## Segment 2 (screenshot: viewing as)

Look at the header of this real Lightning dashboard: as of a date and time, viewing as a person's name, with a Change link. That name is the running user. On a normal dashboard, everyone sees the numbers that user is allowed to see, whatever their own access is. That's powerful, and it can quietly expose data.

## Segment 3 (steps: running-user options)

In the dashboard properties you choose whose access drives the data. The wording can vary, but the choices are yourself, a specified user, or the person viewing the dashboard. That last one is dynamic. Each viewer sees only what their own role, sharing rules, and profile allow.

## Segment 4 (code: comparison)

Compare the two. Fixed user: everyone sees the same numbers, ideal for a company scoreboard once you have checked nothing sensitive is exposed. Dynamic: each person sees their own slice, ideal for my pipeline, with a single dashboard to maintain.

## Segment 5 (steps: limits)

Plan around the tradeoffs, which depend on edition. Editions cap how many dynamic dashboards you can build, so check your org's limit. They generally can't be refreshed on a schedule, because there's no single user to refresh as. And test with view-as, where your permissions allow it.

## Segment 6 (outro)

Before you pick a running user, ask who will open this dashboard and what they should be allowed to see. That one question prevents most data-exposure mistakes. Speaking of refreshing: next lesson covers scheduling and subscriptions.
