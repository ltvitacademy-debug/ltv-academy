# Script — Health Checks & Alerts

## Segment 1 (title)

A backup that fails silently and a server that goes down silently share the same problem: nobody finds out until a customer does. This lesson builds a health-check script that tests Northbridge's services and, when something's wrong, tells a human immediately.

## Segment 2 (code)

Checking the checkout service's health endpoint is one requests call, but the timeout matters as much as the status code check. Without it, requests.get can hang indefinitely waiting for a server that's stopped responding, turning the health check into the very thing it was supposed to catch.

## Segment 3 (code)

Not every health check is a network call. shutil.disk_usage reads total, used, and free bytes for a path with no HTTP request at all, and comparing used against total against a threshold turns that into a simple pass or fail.

## Segment 4 (code)

A failed check nobody sees is almost as bad as no check at all. The same requests.post pattern used for REST APIs earlier in the course sends a message to a Slack incoming webhook -- and that webhook URL lives in an environment variable, because it's a credential, not a string to hardcode.

## Segment 5 (steps)

A health check running every fifteen minutes that alerts on every failure sends the same message dozens of times a day, and after a few repeats nobody reads them. Tracking the previous state and alerting only when it changes means one message when something breaks, one when it recovers, and silence in between.

## Segment 6 (outro)

Combine a network test with a timeout and a local resource test, alert through the same requests.post pattern you already know, and alert on change instead of on every check. That wraps up Chapter 5 -- the capstone in Chapter 6 puts nearly everything from this course together into one project.
