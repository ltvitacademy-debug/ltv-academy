# Script — The Limits of Native Reporting

## Segment 1 (title)

Native Salesforce reporting is powerful, and this course has shown you how far it goes. This chapter is the honest counterweight: where it stops. Knowing the limits is what separates an analyst who fights the tool from one who picks the right tool.

## Segment 2 (code: report types)

Every report starts from one report type, a fixed path through related objects, more like a set of paved roads than a free-form query. Cross filters and joined reports stretch that, but in most orgs you still can't freely join any object to any other the way you would in T-SQL.

## Segment 3 (code: scale)

Then there's scale. In most orgs a report page displays only a couple thousand rows, though summaries and charts still count everything. Dashboards also cap components and filters. Check current Salesforce documentation for exact numbers, because they change between releases. For most dashboards these limits never matter. They matter when someone asks you to analyze everything at once.

## Segment 4 (code: history)

History is the third limit. A report shows records as they are right now. Reporting snapshots and historical trend reports help, but they must be planned in advance. Ask what the pipeline looked like on the first of last quarter, and native often can't answer retroactively.

## Segment 5 (steps: more walls)

More walls: calculations across unrelated objects, blending outside data like ERP or web analytics, performance on very large objects since reports query live data, and deeper analysis like cohorts or statistics. Each of these is a design boundary, not a bug.

## Segment 6 (outro)

None of these make native reporting weak. They mean you should recognize the wall before you hit it. Next up: a practical framework for deciding when to go external.
