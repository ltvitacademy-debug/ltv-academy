# Lesson 6 — Calling a REST Message From Script

**Chapter 2 · Consuming External REST APIs · Lesson 6 of 29**

## What you'll learn

- The real `RESTMessageV2` class and where it comes from in scoped vs. global applications
- The exact constructor pattern that names which REST Message and Function to call
- How `setStringParameterNoEscape()` fills in a Function's placeholders at runtime
- What `.execute()`, `.getStatusCode()`, and `.getBody()` actually return
- Why `.execute()` belongs inside a try/catch, and what throws when it fails

## The class: `RESTMessageV2`

Lesson 4 and 5 built and tested a REST Message entirely from the record. To actually use it from
a Script Include, Business Rule, or Scheduled Job, you call it through the real ServiceNow script
API: **`RESTMessageV2`**. In a scoped application it's referenced as `sn_ws.RESTMessageV2`; in
Global scope you can reference `RESTMessageV2` directly, without the namespace prefix. Both refer
to the same underlying API — scoped applications just require the `sn_ws` namespace because
`RESTMessageV2` lives in the Web Services Integration Suite's scope.

## The constructor: naming the REST Message and Function

```javascript
var r = new sn_ws.RESTMessageV2('WeatherAPI', 'getCurrentConditions');
```

The two constructor arguments are exactly the two names you configured in Lessons 4 and 5: the
REST Message's name (`'WeatherAPI'`) and the specific Function's name
(`'getCurrentConditions'`). Nothing else identifies which operation you're about to call — get
either string wrong (a typo, a renamed record) and you're pointed at the wrong configuration, or
none at all.

## Filling in placeholders: `setStringParameterNoEscape()`

Recall the Function's Endpoint from Lesson 4: `/current?city=${city}`. The `${city}` placeholder
doesn't fill itself in — script does, before the request goes out:

```javascript
r.setStringParameterNoEscape('city', 'Atlanta');
```

Call `setStringParameterNoEscape()` once per placeholder the Function's Endpoint or Content
template defines, with the placeholder's name as the first argument and the real value as the
second. If a Function has three placeholders, you call this method three times before calling
`.execute()`. The name "NoEscape" matters: it substitutes the value as-is into the string, so if
your value itself needs URL-encoding, you're responsible for encoding it before passing it in.

## Sending the request and reading the result

```javascript
try {
  var response = r.execute();
  var httpStatus = response.getStatusCode();
  var responseBody = response.getBody();

  if (httpStatus == 200) {
    var data = JSON.parse(responseBody);
    gs.info('Temperature: ' + data.temperature);
  } else {
    gs.error('WeatherAPI call failed with status ' + httpStatus + ': ' + responseBody);
  }
} catch (ex) {
  gs.error('WeatherAPI call threw an exception: ' + ex.getMessage());
}
```

Walk through each piece:

- **`.execute()`** actually sends the configured request — synchronously, meaning script execution
  pauses until a response comes back (or the call fails outright). It returns a response object.
- **`.getStatusCode()`**, called on that response object, returns the real HTTP status code —
  exactly the same kind of value you saw on the Test screen in Lesson 5, just now available to
  script instead of a human reading a form.
- **`.getBody()`**, also called on the response object, returns the raw response body as a
  string — typically JSON, which you then parse with `JSON.parse()` (the technique Course 5
  covered) to get at individual fields.

## Why `.execute()` needs a try/catch

A successful HTTP call and a *failed* HTTP call are not the same kind of failure. If the external
system is reachable but returns an error, you get back a real status code like 404 or 500 —
`.execute()` still succeeds as far as JavaScript is concerned, and your `if (httpStatus == 200)`
branch handles it. But if the network call itself can't complete — the host is unreachable, the
connection times out, DNS fails to resolve — `.execute()` throws a JavaScript exception instead of
returning a response object at all. Wrapping `.execute()` in try/catch is what keeps a network-
level failure from throwing an unhandled exception that stops your script cold instead of logging
a clean error and letting the rest of your logic decide what to do next.

## Key terms

| Term | Meaning |
|---|---|
| `RESTMessageV2` | The script API class used to call a configured REST Message; `sn_ws.RESTMessageV2` in scoped apps, `RESTMessageV2` in Global |
| Constructor arguments | The REST Message name and Function name, passed as two strings when creating a new `RESTMessageV2` |
| `setStringParameterNoEscape()` | Substitutes a real value into a named `${placeholder}` in the Function's Endpoint or Content |
| `.execute()` | Synchronously sends the configured request and returns a response object, or throws if the network call itself fails |
| `.getStatusCode()` / `.getBody()` | Methods on the response object returning the real HTTP status code and the raw response body string |

## Check yourself

Why does a 500 status code returned by the external system NOT trigger your catch block, while a
DNS failure reaching that same external system DOES trigger it — and what does that difference
tell you about what `.execute()` is actually responsible for versus what your `if` check is
responsible for?
