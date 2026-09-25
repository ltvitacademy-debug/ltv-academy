# Script — Dashboard Filters

## Segment 1 (title)

One dashboard often has to serve many audiences. Instead of building a copy for each, you add a dashboard filter, one control that narrows every compatible widget beneath it.

## Segment 2 (screenshot: dashboard editor filters)

This is a real Sales Overview dashboard in the builder. Across the top sit three filters: Type, Shipping Country, and Account Name. Look at the footer of each widget. That small filter icon lists the fields currently narrowing the numbers, so viewers can see what they are looking at.

## Segment 3 (steps: adding a filter)

To add one, click plus Filter beside plus Widget. Pick the field to filter on. Give it a display name your viewers will understand. Set the values or ranges they can choose. Then save the dashboard.

## Segment 4 (code: WHERE analogy)

If you think in SOQL, a dashboard filter is an extra WHERE condition on top of each widget's own report filters. The report's filters still apply. The dashboard filter adds another, chosen by the viewer at view time, and it never edits the source report.

## Segment 5 (steps: gotchas)

Three things to plan around. A widget responds only if its source report includes the filtered field. Lightning tables support dashboard filters, while legacy tables do not. And Lightning dashboards allow only a small number of filters, commonly three.

## Segment 6 (outro)

When a filter seems to do nothing, check the source report first, because the field has to be present there. Choose your filter fields early, and design the source reports so they share those fields. Next up: dynamic dashboards, which change what each viewer sees.
