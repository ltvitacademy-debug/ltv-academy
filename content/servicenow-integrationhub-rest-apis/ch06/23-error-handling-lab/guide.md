# Lesson 23 — Error Handling Lab

**Chapter 6 · Error Handling, Logging & Retries · Lesson 23 of 29**

## What you'll learn

- How to add production-grade error handling to a working REST Message call
- How to tell a retryable failure apart from one that retrying can't fix, in real code
- How to combine exponential backoff with structured logging in a single function
- Why this exact script is the direct ancestor of the Capstone's error-handling chapter (Chapter 8)

## The scenario

Chapter 2's lab built a working call against the `WeatherAPI` REST Message, using its
`getCurrentConditions` Function to fetch current conditions for a city. That script works — on
the happy path. This lab takes that exact call and hardens it with everything Chapter 6 has
covered: a try/catch around the call, exponential backoff that retries up to three times on a
timeout or server error, a hard rule against retrying a client error, and structured logging that
records the status code and the city on every failure.

## Step 1 — isolate the call, add the try/catch

Start from the working call and wrap it. A try/catch alone doesn't retry anything yet, but it's
the foundation: nothing downstream can throw past this point without the script deciding what
happens next.

```javascript
function getWeatherForCity(city) {
  try {
    var request = new sn_ws.RESTMessageV2('WeatherAPI', 'getCurrentConditions');
    request.setStringParameterNoEscape('city', city);
    request.setHttpTimeout(10000); // 10 seconds
    var response = request.execute();
    // handling goes here
  } catch (ex) {
    gs.error('WeatherAPI threw an exception for city {0}: {1}', city, ex.message);
    return null;
  }
}
```

`setHttpTimeout(10000)` is a real method on the request object — it bounds how long the call
waits before giving up, which is exactly what turns an indefinite hang into a failure your retry
logic can actually react to.

## Step 2 — tell retryable apart from non-retryable

`RESTMessageV2.execute()` generally doesn't throw a JavaScript exception for an HTTP-level
failure — a 4xx or 5xx still comes back as a normal response object, just with that status code.
A transport-level failure (the host was unreachable, the connection timed out before any response
came back at all) shows up differently: `response.getErrorMessage()` returns a non-empty string
when there was no real HTTP response to read a status code from. Checking both is what makes the
retry decision correct instead of guessed:

```javascript
var statusCode = response.getStatusCode();
var transportError = response.getErrorMessage();

if (!transportError && statusCode == 200) {
  return JSON.parse(response.getBody()); // success
}

if (!transportError && statusCode >= 400 && statusCode < 500) {
  // client error — bad request, bad auth. Retrying this exact
  // request will fail again the exact same way. Don't retry.
  gs.error('WeatherAPI client error for city {0}: HTTP {1} - {2}',
    city, statusCode, response.getBody());
  return null;
}

// everything else — a 5xx, or a transport-level failure — is retryable
```

That middle branch is the one rule that matters most in this whole lab: a 4xx means the request
itself is wrong, and retrying an identical wrong request produces an identical wrong result. Only
a transport failure or a 5xx justifies spending a retry.

## Step 3 — wrap it in exponential backoff

Now the retryable branch gets a loop instead of a single attempt, using the same doubling-delay
pattern from Lesson 21:

```javascript
function getWeatherForCity(city) {
  var maxRetries = 3;
  var backoffMs = 1000;
  var attempt = 0;

  while (attempt <= maxRetries) {
    try {
      var request = new sn_ws.RESTMessageV2('WeatherAPI', 'getCurrentConditions');
      request.setStringParameterNoEscape('city', city);
      request.setHttpTimeout(10000);
      var response = request.execute();

      var statusCode = response.getStatusCode();
      var transportError = response.getErrorMessage();

      if (!transportError && statusCode == 200) {
        gs.info('WeatherAPI: HTTP 200 for city {0} on attempt {1}', city, attempt + 1);
        return JSON.parse(response.getBody());
      }

      if (!transportError && statusCode >= 400 && statusCode < 500) {
        gs.error('WeatherAPI client error for city {0}: HTTP {1} - {2}',
          city, statusCode, response.getBody());
        return null; // never retry a 4xx
      }

      gs.warn('WeatherAPI retryable failure for city {0}: HTTP {1}, transport: {2} (attempt {3} of {4})',
        city, statusCode, transportError, attempt + 1, maxRetries + 1);

    } catch (ex) {
      gs.warn('WeatherAPI threw for city {0}: {1} (attempt {2} of {3})',
        city, ex.message, attempt + 1, maxRetries + 1);
    }

    attempt++;
    if (attempt <= maxRetries) {
      gs.sleep(backoffMs);
      backoffMs = backoffMs * 2;
    }
  }

  gs.error('WeatherAPI exhausted {0} attempts for city {1}', maxRetries + 1, city);
  return null;
}
```

Trace what happens on a real server error: attempt 1 gets HTTP 503, logs a warning with the
status code and city, sleeps 1 second, doubles the backoff to 2 seconds. Attempt 2 gets 503
again, logs again, sleeps 2 seconds, doubles to 4. Attempt 3 finally gets 200, logs the success
with which attempt it took, and returns the parsed data. Four attempts total (the original plus
three retries), each one logged with enough detail to answer "what happened" without re-running
anything.

## Step 4 — why this script, specifically, survives contact with production

Every piece here earns its place. The timeout turns a hang into a failure. The status-code and
transport-error check together catch both kinds of failure RESTMessageV2 can produce. The 4xx
branch stops a doomed retry before it wastes an attempt. The backoff loop gives a struggling
external system real recovery room instead of hammering it. And the structured logging means
that whoever looks at this a week from now — maybe you — can tell exactly which city failed,
with what status code, on which attempt, without reproducing the failure first.

This is also, not coincidentally, close to exactly what Chapter 8's Capstone asks you to build
for its own integration (Lesson 28, "Capstone: Build Error Handling, Logging & Retries") — the
same three ingredients, applied to a different external system.

## Key terms

| Term | Meaning |
|---|---|
| `setHttpTimeout(ms)` | Real method on the request object that bounds how long `.execute()` waits before giving up |
| `getErrorMessage()` | Real method on the response object; non-empty when a transport-level failure occurred with no real HTTP response |
| Non-retryable (4xx) | A client error — the request itself is wrong, so identical retries produce an identical failure |
| Retryable (5xx / transport) | A server-side or connectivity failure that may genuinely succeed on a later attempt |
| Attempt budget | The fixed maximum number of tries (original plus retries) before the script gives up and logs exhaustion |

## Check yourself

In the final script, what two conditions have to both be false before a failure is treated as
retryable, and why does checking `getErrorMessage()` in addition to the status code matter, given
that a transport-level failure never produces a status code to check in the first place?
