# Script — Azure Monitor Metrics & Logs

## Segment 1 (title)

Azure Monitor is the umbrella platform behind everything Azure collects about your resources. Before you touch Log Analytics or Application Insights, you need to understand the two very different kinds of data it collects: metrics and logs, and why the platform keeps them in separate stores.

## Segment 2 (screenshot)

Metrics Explorer is the Azure portal's built-in charting tool. Pick a resource, pick a metric like CPU percentage or request count, pick an aggregation — average, max, count, or sum — and Azure draws the time series, no query language required. If Northbridge's checkout service runs on App Service, metrics like CPU percentage, queue length, and average response time are already flowing in before anyone writes a line of monitoring code.

## Segment 3 (screenshot)

You can plot more than one metric on the same chart, which is how you'd correlate response time against request count while chasing a latency spike during a flash sale. Platform metrics only cover what Azure already knows about a resource — custom metrics let your application emit its own numbers, like cart abandonment count, and many metrics also support dimensions, letting you split a chart by a property like HTTP status code to isolate just the failures.

## Segment 4 (steps)

Logs are a different animal entirely: detailed structured or free-text records, like an exception with its full stack trace or a custom event your code emits, stored in a Log Analytics workspace and queried with KQL. Metrics answer "how much, right now" cheaply and in near real time, which is what you wire alerts to. Logs answer "what exactly happened to this one request," with far more detail but at higher query cost — that's what you dig into once an alert fires.

## Segment 5 (outro)

Azure Monitor keeps metrics and logs in separate stores specifically so you can pivot from a metric spike straight into the logs behind it — that pivot is the backbone of how you'll investigate every incident in this course. Next up, lesson seven: Log Analytics and KQL, the query language that makes that pivot possible.
