# Lesson 7 — Consuming REST APIs Lab

**Chapter 2 · Consuming External REST APIs · Lesson 7 of 29**

## What you'll learn

- How to plan a complete outbound integration before touching any record
- How to configure a REST Message and Function for a real external weather lookup
- How to write a Script Include method that calls it, parses JSON, and returns clean data
- How to apply try/catch error handling across both the network call and the JSON parsing step
- How the pieces from Lessons 4-6 combine into one working integration

## The scenario

A ServiceNow instance needs to show the current temperature and conditions for a city, pulled
from an external weather API, inside a Business Rule or a Service Portal widget. This lab builds
that integration end to end: one REST Message, one Function, one Script Include method —
exactly the shape you'll reuse for almost any outbound lookup.

## Step 1 — Configure the REST Message

Following Lesson 4's model, create a REST Message named `WeatherAPI`:

```
REST Message: WeatherAPI
  Endpoint: https://api.weatherservice.com/v1
  Authentication Profile: WeatherAPI Basic Auth
```

## Step 2 — Add and test the Function

Following Lesson 5, add one Function for the one operation this scenario needs:

```
Function: getCurrentConditions
  HTTP Method: GET
  Endpoint: /current?city=${city}
```

Before writing any script, run Test on this Function with `city` set to a real value, e.g.
`Atlanta`. A clean 200 with a JSON body confirms the Endpoint, Authentication Profile, and path
are all correct — isolating configuration from script, exactly as Lesson 5 covered. Assume the
real response body looks like this:

```json
{"city": "Atlanta", "temperature": 71, "conditions": "Partly Cloudy"}
```

## Step 3 — Write the Script Include method

With the REST Message verified, write a Script Include method that calls it, using
`RESTMessageV2` (Lesson 6), parses the JSON body (Course 5's `JSON.parse()`), and returns only
the two fields the caller actually needs — never the raw response:

```javascript
var WeatherLookup = Class.create();
WeatherLookup.prototype = {
  initialize: function() {},

  getConditionsForCity: function(city) {
    var result = { success: false, temperature: null, conditions: null, error: null };

    try {
      var r = new sn_ws.RESTMessageV2('WeatherAPI', 'getCurrentConditions');
      r.setStringParameterNoEscape('city', city);

      var response = r.execute();
      var httpStatus = response.getStatusCode();
      var responseBody = response.getBody();

      if (httpStatus != 200) {
        result.error = 'WeatherAPI returned status ' + httpStatus + ': ' + responseBody;
        return result;
      }

      var data = JSON.parse(responseBody);
      result.success = true;
      result.temperature = data.temperature;
      result.conditions = data.conditions;

    } catch (ex) {
      result.error = 'WeatherAPI call failed: ' + ex.getMessage();
    }

    return result;
  },

  type: 'WeatherLookup'
};
```

## Step 4 — Walk through why each piece is there

- **The constructor arguments** (`'WeatherAPI'`, `'getCurrentConditions'`) point at exactly the
  REST Message and Function configured in Steps 1-2 — nothing more is needed to identify which
  operation to run.
- **`setStringParameterNoEscape('city', city)`** fills in the one placeholder the Function's
  Endpoint defines, using whatever city the caller passed into `getConditionsForCity()`.
- **The status-code check before parsing** matters: if the external system returned anything
  other than 200 — say a 404 for an unrecognized city — the response body may not even be valid
  JSON, so checking `httpStatus` first avoids calling `JSON.parse()` on something that isn't
  guaranteed to be parseable JSON at all.
- **The try/catch around the whole block** catches two distinct failure modes at once: a network-
  level failure thrown by `.execute()` itself (Lesson 6), and a parsing failure thrown by
  `JSON.parse()` if the body is malformed JSON despite a 200 status. Either way, the caller gets
  back a clean `result.error` string instead of an unhandled exception.
- **The return shape** (`success`, `temperature`, `conditions`, `error`) is deliberately narrow.
  Callers — a Business Rule, a Scripted REST API in Chapter 4, a Service Portal widget — never
  see the raw HTTP response or the raw JSON; they get exactly the two fields they asked for, or a
  clear reason why they didn't.

## Step 5 — Calling it

A Business Rule or Script Include elsewhere in the instance now needs only this:

```javascript
var lookup = new WeatherLookup();
var conditions = lookup.getConditionsForCity('Atlanta');

if (conditions.success) {
  gs.info('Atlanta: ' + conditions.temperature + ' degrees, ' + conditions.conditions);
} else {
  gs.error('Weather lookup failed: ' + conditions.error);
}
```

Every piece of this lab reuses what Lessons 4-6 already established: the REST Message/Function
split, the Test-before-script discipline, and the `RESTMessageV2` call pattern with its two
distinct kinds of error handling. Nothing here is new — it's the same four ideas, assembled into
one working integration.

## Key terms

| Term | Meaning |
|---|---|
| End-to-end integration | REST Message + Function + Script Include working together as one reusable unit |
| Narrow return shape | Returning only the fields a caller needs (not the raw response), so callers never parse HTTP details themselves |
| Status-check-before-parse | Checking `httpStatus` before calling `JSON.parse()`, since a non-200 body may not be valid JSON |
| Dual error handling | One try/catch covering both a network-level `.execute()` failure and a `JSON.parse()` failure |

## Check yourself

If `getConditionsForCity('Nowhereville')` hits the external API and gets back a 404 with a plain
text error message (not JSON) in the body, walk through this script line by line: does it throw
an unhandled exception, or does it return cleanly with `result.error` set — and which specific
line of code is responsible for that outcome?
