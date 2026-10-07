# Application Insights

Application Insights is Azure Monitor's application performance monitoring (APM) layer — the piece that understands your *application's* structure, not just the virtual machines and containers it runs on. Where Metrics Explorer and Log Analytics work with whatever data you point them at, Application Insights auto-instruments your code to produce requests, dependencies, and exceptions without you writing custom telemetry for every call.

## What you'll learn

- What Application Insights auto-collects once it's wired into your app
- How the Application Map shows your service topology and where it's unhealthy
- How to drill from a map node into one specific slow request's end-to-end timeline
- Where Live Metrics fits when you need to watch a deployment in real time

## Auto-instrumentation: telemetry you didn't write

Once Application Insights is attached to Northbridge's checkout service (via an SDK or, in many Azure services, a zero-code extension), it starts automatically capturing: every incoming HTTP request, every outgoing call to a dependency (a SQL database, an external payment API, another microservice), every unhandled exception, and page views and AJAX calls if it's a web front end too. You get this without adding a single logging statement — which is exactly how an on-call engineer gets visibility into a service they didn't instrument by hand.

## The Application Map: your topology, colored by health

The Application Map draws every component your application talks to — and the ones that talk to it — as a graph, with each node's color showing its health:

![Application Insights Application Map in the Azure portal, showing a graph of interconnected service nodes with performance numbers on each node and connecting line.](/courses/monitoring-logging-and-observability/ch02/08-application-insights/app-insights-overview.png)
*Each node shows calls-per-minute and average duration; a node going red is where to look first.*
Source: [Application Map: Triage Distributed Applications — Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-map)

During a flash sale, if checkout's dependency call to the payment gateway starts failing, that node turns red on the map before a human notices anything — the map is often the fastest way to localize *which* component broke, before you query a single log.

## From a map node to one request's full timeline

Clicking a node and choosing "Go to details" takes you from "this component is unhealthy" to the full end-to-end transaction details for a specific slow or failed request — every hop it made, how long each hop took:

![Application Insights end-to-end transaction details view showing a timeline of spans for one request, each span labeled with its component and duration.](/courses/monitoring-logging-and-observability/ch02/08-application-insights/view-end-to-end-transaction.png)
*A waterfall of every hop one request made — this is Azure's version of a distributed trace, the subject you'll see again under OpenTelemetry in Chapter 5.*
Source: [Application Map: Triage Distributed Applications — Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-map)

## When you need to watch it happen live

Application Map and Log Analytics both work off data that's already landed. **Live Metrics** streams telemetry with roughly one-second latency, filterable on the fly — the tool you'd open while watching a canary deployment of the checkout service roll out, to catch a regression within seconds instead of waiting for the next KQL query.

## Key terms

- **Application Insights** — Azure Monitor's APM layer; auto-instruments requests, dependencies, and exceptions
- **Auto-instrumentation** — telemetry collected automatically once Application Insights is attached, no custom code required
- **Application Map** — a graph of your application's components, colored by health, built from dependency telemetry
- **End-to-end transaction details** — the full timeline of hops one specific request made across your system
- **Live Metrics** — a near-real-time (≈1 second latency) telemetry stream, used to watch deployments as they happen
