# Lesson 31 — Capstone: Build the Script Include Library

**Chapter 7 · Capstone: a Reusable Script Include Library · Lesson 31 of 32**

## What you'll learn

- How to implement `isUserInGroup` with a real, efficient GlideRecord query against `sys_user_grmember`
- How one Script Include supports both plain server-side calls and a client-callable GlideAjax entry point at the same time
- How to implement `formatDueDate` using `GlideDateTime` comparison methods from Chapter 2
- How to implement `getReferenceDisplayValue` defensively, checking the field exists before reading it
- How a Client Script actually calls the client-callable method through GlideAjax

## Supporting both calling styles in one class

Lesson 30 ended on a design question: `isUserInGroup` needs to be reachable
from a Client Script, but `formatDueDate` and `getReferenceDisplayValue`
are server-side only. The way ServiceNow resolves this is by extending
`AbstractAjaxProcessor` — the same base class Chapter 4 used — and adding
a thin **client-callable wrapper** method alongside the real logic. The
wrapper's only job is reading parameters that GlideAjax sent over and
handing them to the real method. Server-side scripts never touch the
wrapper; they call `isUserInGroup` directly with real arguments.

## Implementing `isUserInGroup`

The real logic looks up the group by name, then checks whether the user
has a membership record pointing at that group's sys\_id — exactly the
GlideRecord patterns from Chapter 3, including `setLimit(1)` so the query
stops as soon as one matching row is found instead of scanning further:

```javascript
var TaskUtils = Class.create();
TaskUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

  isUserInGroup: function(userId, groupName) {
    if (!userId || !groupName) {
      return false;
    }

    var groupGr = new GlideRecord('sys_user_group');
    groupGr.addQuery('name', groupName);
    groupGr.query();
    if (!groupGr.next()) {
      return false; // no group with that name exists
    }

    var memberGr = new GlideRecord('sys_user_grmember');
    memberGr.addQuery('user', userId);
    memberGr.addQuery('group', groupGr.getUniqueValue());
    memberGr.setLimit(1);
    memberGr.query();
    return memberGr.next();
  },

  // continued below
```

Two guard checks matter here. First, `if (!userId || !groupName)` returns
`false` immediately instead of running a query with an empty value —
cheap insurance against a careless caller. Second, checking
`groupGr.next()` before querying `sys_user_grmember` avoids querying
membership against a group that doesn't exist at all.

## Adding the client-callable wrapper

Right alongside `isUserInGroup`, this same class adds one more method:
a wrapper with no parameters of its own, which pulls its inputs from
`this.getParameter()` — the exact pattern Chapter 4 Lesson 19 introduced.
Only this wrapper method needs the **Client callable** checkbox checked
on the Script Include record; `isUserInGroup` itself does not:

```javascript
  ajaxIsUserInGroup: function() {
    var userId = this.getParameter('sysparm_user_id');
    var groupName = this.getParameter('sysparm_group_name');
    return this.isUserInGroup(userId, groupName).toString();
  },

  // continued below
```

Note the `.toString()` at the end. GlideAjax always sends its answer back
to the browser as text, never as a native Boolean, so the wrapper converts
`true`/`false` into the strings `"true"`/`"false"` before returning them.
A Client Script calls this exactly the way Chapter 4 Lesson 20 taught:

```javascript
function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue === '') {
    return;
  }

  var ga = new GlideAjax('TaskUtils');
  ga.addParam('sysparm_name', 'ajaxIsUserInGroup');
  ga.addParam('sysparm_user_id', newValue);
  ga.addParam('sysparm_group_name', 'Network');
  ga.getXMLAnswer(function(answer) {
    if (answer === 'true') {
      g_form.showFieldMsg('assigned_to', 'Heads up: this user is on the Network team', 'info');
    }
  });
}
```

## Implementing `formatDueDate`

This method takes a `GlideDateTime` object — not a raw string — and
returns a display-ready string, flagging the date as overdue when it has
already passed. `GlideDateTime`'s own `before()` method, from Chapter 2,
does the comparison correctly across time zones without any manual date
math:

```javascript
  formatDueDate: function(glideDateTime) {
    if (!glideDateTime || glideDateTime.getNumericValue() === 0) {
      return '(no due date)';
    }

    var now = new GlideDateTime();
    var display = glideDateTime.getDisplayValue();

    if (glideDateTime.before(now)) {
      return display + ' (overdue)';
    }

    return display;
  },

  // continued below
```

`getNumericValue() === 0` catches an empty `GlideDateTime` — one that was
constructed but never given a real date — which would otherwise slip past
a simple `!glideDateTime` check.

## Implementing `getReferenceDisplayValue`

The last method takes any `GlideRecord` and a field name, and safely
returns that field's display value — the human-readable text, not the
sys\_id a reference field actually stores. It checks the field exists on
that table before trying to read it, logging a diagnostic message if it
doesn't:

```javascript
  getReferenceDisplayValue: function(gr, fieldName) {
    if (!gr || !fieldName) {
      return '';
    }

    if (!gr.isValidField(fieldName)) {
      gs.info('TaskUtils.getReferenceDisplayValue: ' + fieldName +
        ' is not a valid field on ' + gr.getTableName());
      return '';
    }

    return gr.getDisplayValue(fieldName) || '';
  },

  type: 'TaskUtils'
});
```

The `|| ''` guard at the end covers the case where the field is valid but
genuinely empty — `getDisplayValue()` can return `null` for an unset
reference field, and this method always promises a string back to its
caller, never `null`.

## Key terms

| Term | Meaning |
|---|---|
| `AbstractAjaxProcessor` | The base class a Script Include must extend to be reachable through GlideAjax |
| Client-callable wrapper | A thin method with no real parameters that reads `this.getParameter()` and delegates to the real logic |
| `setLimit(1)` | Stops a GlideRecord query after the first match, avoiding an unnecessary full scan |
| `getDisplayValue(fieldName)` | Returns a reference field's human-readable text instead of its stored sys\_id |
| `before()` | A `GlideDateTime` method that correctly compares two dates across time zones |

## Check yourself

Before moving to Lesson 32, trace through `ajaxIsUserInGroup` by hand:
what does `this.getParameter('sysparm_user_id')` actually return if the
Client Script forgot to call `addParam('sysparm_user_id', ...)` at all,
and what would `isUserInGroup` then do with that value?
