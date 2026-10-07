# Script — A Troubleshooting Methodology

## Segment 1 (title)

Everything so far has been raw material — metrics, logs, traces, golden signals. This lesson is the method that turns that material into a diagnosis under pressure, and we'll run it against the incident this course has been building toward: a checkout-latency spike at Northbridge Retail during a flash sale.

## Segment 2 (steps)

Work outward from the symptom, in order. Confirm the symptom as a measured number, not a secondhand report. Check the golden signals to see which one is actually driving it. Check recent changes — deploys, config, feature flags, even an upstream dependency's deploy. Then narrow by trace to the responsible service, and form a hypothesis you check against data before you act on it.

## Segment 3 (code)

Once you've narrowed to a suspect resource, the USE method asks three questions: utilization, how busy is it; saturation, how much work is queued waiting for it; and errors, is it failing outright. A resource can look fine on utilization and still be your bottleneck if saturation is high — a connection pool at sixty percent utilization with a long wait queue is saturated, not healthy, and that distinction is exactly what a quick utilization-only check would miss.

## Segment 4 (steps)

Here's the method live. Northbridge's checkout latency jumps from 400 milliseconds to 6.2 seconds at p99, with traffic up and errors flat — that's the flash sale, not a failure yet. No recent deploy to checkout rules that out fast. Traces show the slow spans are all waiting on the inventory service, and USE on its database connection pool finds it: saturated, queued, undersized for flash-sale load.

## Segment 5 (outro)

That's the diagnosis — the engineer raises the pool size and adds a circuit breaker so checkout degrades gracefully next time instead of queuing indefinitely. Now the question is how that response gets coordinated and who's actually in charge while it happens. Next up, lesson twenty-five: on-call practices and incident management.
