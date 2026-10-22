# Lesson 21 — GlideAjax Lab

**Chapter 4 · GlideAjax & Client-Server Communication · Lesson 21 of 32**

## What you'll learn

- How to combine everything from this chapter into one complete, working GlideAjax round trip
- Writing a full `AbstractAjaxProcessor` Script Include method, `isDateInFreezeWindow`, with a
  realistic date-comparison implementation
- Writing the matching client script, wired to the Change Request's planned start/end date fields
- Using `g_form.addInfoMessage()` to surface a server-side result back to the user, live, as they type

## The scenario

A Change Request has planned start and end dates. The organization maintains a change freeze —
a date range during which no changes should normally be scheduled (a holiday blackout, a
quarter-end lockdown). As soon as a user sets or edits either date field, you want to warn them,
*before they even submit the form*, if their planned window falls inside the freeze. That check —
"does this date range overlap the freeze?" — has to run against real server-side logic, so it
needs a GlideAjax round trip, not something written entirely in the Client Script.

## Step 1: the Script Include

Create a Script Include named `ChangeFreezeChecker`. It extends `AbstractAjaxProcessor`, so it's
eligible to be a GlideAjax target, and the record's **Client callable** checkbox is checked.

```javascript
var ChangeFreezeChecker = Class.create();
ChangeFreezeChecker.prototype = Object.extendsObject(AbstractAjaxProcessor, {

  // Freeze window: end of quarter lockdown. In a real instance this
  // would likely come from a system property or a dedicated table.
  FREEZE_START: '2026-12-15',
  FREEZE_END: '2027-01-02',

  // Public method - callable from the client, because this Script
  // Include is Client callable and this name has no leading underscore.
  isDateInFreezeWindow: function() {
    var plannedStart = this.getParameter('sysparm_start');
    var plannedEnd = this.getParameter('sysparm_end');

    if (!plannedStart || !plannedEnd) {
      return 'false';
    }

    return this._overlapsFreeze(plannedStart, plannedEnd) ? 'true' : 'false';
  },

  // Private helper - the leading underscore means this is never a
  // valid GlideAjax target on its own, even though the Script
  // Include itself is client callable.
  _overlapsFreeze: function(startStr, endStr) {
    var gdStart = new GlideDateTime(startStr);
    var gdEnd = new GlideDateTime(endStr);
    var freezeStart = new GlideDateTime(this.FREEZE_START);
    var freezeEnd = new GlideDateTime(this.FREEZE_END);

    // Overlap exists unless the planned range ends before the freeze
    // starts, or starts after the freeze ends.
    var endsBeforeFreeze = gdEnd.before(freezeStart);
    var startsAfterFreeze = gdStart.after(freezeEnd);

    return !(endsBeforeFreeze || startsAfterFreeze);
  },

  type: 'ChangeFreezeChecker'
});
```

`isDateInFreezeWindow` is the only method this Script Include exposes to the client. It reads two
parameters, guards against either one being empty, and delegates the actual date math to
`_overlapsFreeze` — which stays server-side-only by naming convention, exactly as Lesson 19
covered.

## Step 2: the client script

This is an `onChange` Client Script on the Change Request table (`change_request`), set to run on
both the `start_date` and `end_date` fields (two Client Script records, same body, different
field).

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || newValue === '') {
    return;
  }

  var startDate = g_form.getValue('start_date');
  var endDate = g_form.getValue('end_date');

  if (!startDate || !endDate) {
    return;
  }

  var ga = new GlideAjax('ChangeFreezeChecker');
  ga.addParam('sysparm_name', 'isDateInFreezeWindow');
  ga.addParam('sysparm_start', startDate);
  ga.addParam('sysparm_end', endDate);

  ga.getXMLAnswer(function(answer) {
    if (answer === 'true') {
      g_form.addInfoMessage(
        'Heads up: this planned date range overlaps an active change freeze. ' +
        'Confirm with your change manager before proceeding.'
      );
    }
  });
}
```

Walking through it: `isLoading` is skipped so the check doesn't fire while the form is still
populating; both date fields are read with `g_form.getValue()` and checked for emptiness, since
checking an incomplete range server-side would be wasted work. The `GlideAjax` call names
`ChangeFreezeChecker` and, via `sysparm_name`, `isDateInFreezeWindow` specifically. The two
`sysparm_start`/`sysparm_end` parameters match exactly what `getParameter()` reads on the server
side. Finally, the entire response-handling logic — the `if` check and the `g_form.addInfoMessage`
call — lives *inside* `getXMLAnswer`'s callback, because that's the only place the real answer is
guaranteed to exist, per Lesson 20.

## Why this is the right shape for the job

Notice what never happens in the Client Script: no `GlideRecord`, no direct freeze-table query, no
date-math logic written client-side. All of that lives in the Script Include, where it belongs,
and the client only ever sees a plain `'true'`/`'false'` answer. If the freeze dates ever need to
come from a real configuration table instead of two hardcoded strings, only `ChangeFreezeChecker`
changes — the client script, and the contract between the two, stay exactly the same.

## Key terms

| Term | Meaning |
|---|---|
| Change freeze | A date range during which changes should not normally be scheduled |
| `isDateInFreezeWindow` | This lab's public, client-callable method on `ChangeFreezeChecker` |
| `GlideDateTime` | ServiceNow's server-side class for comparing dates like `before()`/`after()` |
| `g_form.addInfoMessage()` | Shows a non-blocking informational message on the form, from the client |

## Check yourself

Without looking back: trace this lab's full round trip in your own words, from the user editing
`end_date`, through the Script Include, to the message appearing on the form — naming which piece
runs in the browser and which piece runs on the server at each step.
