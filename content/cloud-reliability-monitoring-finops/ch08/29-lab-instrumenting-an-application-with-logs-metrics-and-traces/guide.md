# Lesson 29 — Lab: Instrumenting an Application with Logs, Metrics, and Traces

**Chapter 8 · Capstone: Operating a Production Cloud Environment · Lesson 29 of 32**

## What you'll learn

- How to turn an application that only prints unstructured lines to stdout into one that emits all
  three pillars — structured logs, a custom metric, and a trace span — for a fictional retailer
  called Ridgeline Outfitters
- How to add a JSON log formatter that carries a request ID through every line, the way Chapter 1
  described and Lesson 2 built in detail
- How to record a custom histogram metric with OpenTelemetry instead of relying only on what the
  platform emits for you automatically
- How to wrap a risky downstream call in its own trace span, and how to wire all three signals into
  Azure Monitor so one KQL query can pull them back out, correlated by the same ID

## The scenario

Ridgeline Outfitters runs `order-service`, a small Python checkout API on AKS that calls out to a
third-party payment gateway on every order. Today it emits exactly one kind of telemetry: plain
`print()` lines with no timestamp discipline, no request correlation, and nothing machine-queryable.
Chapters 1 through 3 covered why that's a problem and what Azure Monitor does with better input. This
lab makes it real: by the end, `order-service` emits structured logs, one custom metric, and one
trace span, and all three can be pulled back out of Azure Monitor using the same `request_id`.

## Step 1 — Replace print statements with structured JSON logs

```python
# app/logging_config.py
import logging, json, sys, time

class JsonFormatter(logging.Formatter):
    def format(self, record):
        payload = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(record.created)),
            "level": record.levelname,
            "message": record.getMessage(),
            "request_id": getattr(record, "request_id", None),
            "order_id": getattr(record, "order_id", None),
        }
        return json.dumps(payload)

handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(JsonFormatter())
logger = logging.getLogger("order_service")
logger.addHandler(handler)
logger.setLevel(logging.INFO)
```

Every call site now passes `extra={"request_id": req_id, "order_id": order_id}`, so a single filter
on `request_id` in Log Analytics returns every log line that belongs to one specific checkout —
exactly the ground-truth lookup Lesson 2 built this formatter to support.

## Step 2 — Add a custom metric instead of relying only on platform defaults

AKS and Azure Monitor already hand you CPU and memory for free, but nothing tells you how long a
checkout actually takes from the application's own point of view. That has to be instrumented:

```python
# app/metrics.py
from opentelemetry import metrics

meter = metrics.get_meter("order_service")
checkout_duration = meter.create_histogram(
    name="order_checkout_duration_seconds",
    description="Time to process one checkout end to end",
    unit="s",
)

# in the checkout handler, around the whole request:
start = time.time()
try:
    process_checkout(order)
finally:
    checkout_duration.record(time.time() - start, {"route": "/checkout"})
```

This single histogram is what turns into the real alerting query Chapter 1 showed —
`histogram_quantile(0.99, ...)` — except now it's measuring Ridgeline's own checkout logic, not a
generic platform metric that can't see inside the request.

## Step 3 — Wrap the risky call in its own trace span

The payment gateway call is the one most likely to be slow or to fail, so it gets its own span
instead of disappearing into the checkout handler's total time:

```python
# app/payment.py
from opentelemetry import trace

tracer = trace.get_tracer("order_service")

def charge_card(order):
    with tracer.start_as_current_span("charge_card") as span:
        span.set_attribute("order.id", order.id)
        response = payment_gateway.charge(order.total)
        span.set_attribute("payment.status", response.status)
        return response
```

That span nests inside the checkout request's own parent span automatically, so a slow payment call
shows up exactly the way Lesson 1's `inventory-service` example did — as the one child span that
dominates the parent's total duration.

## Step 4 — Wire it all into Azure Monitor

```python
# app/telemetry.py
from azure.monitor.opentelemetry import configure_azure_monitor

configure_azure_monitor(
    connection_string=os.environ["APPLICATIONINSIGHTS_CONNECTION_STRING"],
)
```

One call, made once at process startup, points the OpenTelemetry SDK's exporters at the Application
Insights resource from Chapter 2 — the structured logs, the `order_checkout_duration_seconds`
histogram, and every `charge_card` span all flow through the same connection string, tagged with the
same trace context.

## Verifying it landed, with one query

```kql
union AppTraces, AppMetrics, AppDependencies
| where TimeGenerated > ago(15m)
| where OperationId == "7e3b2f9a1c4d"
| project TimeGenerated, ItemType, Name, Message
| order by TimeGenerated asc
```

One `OperationId` — Application Insights' name for the same trace ID Lesson 1 and Lesson 3 already
covered — pulls back the log line, the histogram recording, and the `charge_card` span for one real
checkout, in order. That's the actual proof this lab worked: not that each pillar exists in
isolation, but that they share one correlation key.

## Key terms

| Term | Meaning |
|---|---|
| JSON log formatter | Rewrites each log record as structured JSON carrying a request ID, so a single filter returns every line for one request |
| Custom histogram | An application-level metric the platform can't infer on its own, recorded explicitly at the point that matters |
| Trace span | A named, timed unit of work nested inside a parent operation, used here around the riskiest downstream call |
| `OperationId` | Application Insights' field for the shared trace ID that correlates logs, metrics, and spans from the same request |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why does wrapping only the
payment-gateway call in its own span matter more than just timing the whole checkout handler as one
block, and what does the shared `OperationId` actually let you do that three separate, uncorrelated
telemetry streams couldn't?
