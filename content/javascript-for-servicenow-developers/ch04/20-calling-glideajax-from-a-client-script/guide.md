# Lesson 20 — Calling GlideAjax From a Client Script

**Chapter 4 · GlideAjax & Client-Server Communication · Lesson 20 of 32**

## What you'll learn

- The real, standard client-side calling pattern: constructing a `GlideAjax` object, naming a
  method with `sysparm_name`, and passing arguments with `addParam()`
- Exactly what `getXMLAnswer()` does, and why it's asynchronous rather than returning a value directly
- How to connect a GlideAjax result back to the form with `g_form`
- A common mistake: using the answer before the callback has actually run

## Constructing the call

Last lesson built `FreezeWindowChecker`, a Script Include extending `AbstractAjaxProcessor` with
a public method, `checkDateRange`. Here's the client script that calls it:

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || newValue === '') {
    return;
  }

  var ga = new GlideAjax('FreezeWindowChecker');
  ga.addParam('sysparm_name', 'checkDateRange');
  ga.addParam('sysparm_start', g_form.getValue('start_date'));
  ga.addParam('sysparm_end', g_form.getValue('end_date'));

  ga.getXMLAnswer(function(answer) {
    if (answer === 'true') {
      g_form.addInfoMessage('This date range overlaps an active change freeze.');
    }
  });
}
```

`new GlideAjax('FreezeWindowChecker')` names the Script Include — this must match the Script
Include's `type` property exactly. `sysparm_name` is special: it's always the parameter that
tells GlideAjax which public method on that Script Include to run. Every other `sysparm_` name
you choose (`sysparm_start`, `sysparm_end` here) becomes an argument, retrieved on the server side
with `getParameter()` using that exact same name.

## getXMLAnswer() is the real, standard asynchronous callback

`getXMLAnswer()` does not return the server's answer as its own return value. Instead, it takes a
callback function as its argument, and that function runs later — only once the server has
actually processed the request and responded. This is the real, standard way GlideAjax is called
asynchronously on the ServiceNow platform; there's no synchronous shortcut for getting the answer
immediately on the next line. Everything that needs the answer — reading it, acting on it,
updating the form — has to happen *inside* that callback function, not after it.

## A common mistake: using the answer too early

```javascript
// WRONG - this does not work the way it looks like it should
var ga = new GlideAjax('FreezeWindowChecker');
ga.addParam('sysparm_name', 'checkDateRange');
ga.addParam('sysparm_start', g_form.getValue('start_date'));
ga.addParam('sysparm_end', g_form.getValue('end_date'));

var result;
ga.getXMLAnswer(function(answer) {
  result = answer;
});

if (result === 'true') {        // result is still undefined here!
  g_form.addInfoMessage('Date range conflict.');  // never runs
}
```

The `if` statement runs immediately, before the server has had a chance to respond, so `result`
is still `undefined` at that point — not `'true'` or `'false'`. The fix is always the same: do the
checking and the form update *inside* the callback itself, exactly as the first example in this
lesson does. This gap between "the call is made" and "the answer is available" is exactly what
Chapter 5's Asynchronous Client Scripts lesson explores in more depth, including patterns for
chaining multiple GlideAjax calls correctly.

## Key terms

| Term | Meaning |
|---|---|
| `sysparm_name` | The reserved parameter that tells GlideAjax which Script Include method to run |
| `addParam()` | Adds one argument to the GlideAjax call, as a name/value pair |
| `getXMLAnswer()` | The real, standard asynchronous callback method for retrieving a GlideAjax result |
| Callback function | Code that runs later, once the server actually responds — not on the next line |

## Check yourself

Without looking back: in the client script above, which line of code actually sends the request
to the server, and why does code placed immediately after that line — but outside the callback —
risk reading a value that isn't ready yet?
