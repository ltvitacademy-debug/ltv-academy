# Lesson 19 — Building a Script Include for GlideAjax

**Chapter 4 · GlideAjax & Client-Server Communication · Lesson 19 of 32**

## What you'll learn

- The real base class every GlideAjax-callable Script Include must extend: `AbstractAjaxProcessor`
- The "Client callable" checkbox, and why it's a required security setting, not a default
- The underscore naming convention that hides a method from the client, even on a callable record
- How to read an incoming parameter with `getParameter()` and return a result with a plain return statement

## The base class: AbstractAjaxProcessor

Any Script Include that GlideAjax is going to call must extend ServiceNow's real,
built-in `AbstractAjaxProcessor` class. This is not optional — it's what wires your Script
Include into the GlideAjax request/response plumbing in the first place. A regular Script Include
that doesn't extend it cannot be the target of a GlideAjax call at all, no matter how its other
settings are configured.

```javascript
var FreezeWindowChecker = Class.create();
FreezeWindowChecker.prototype = Object.extendsObject(AbstractAjaxProcessor, {

  isFreezeActive: function() {
    var isActive = this.getParameter('sysparm_active');
    return isActive === 'true' ? 'yes' : 'no';
  },

  type: 'FreezeWindowChecker'
});
```

Notice the shape: `Object.extendsObject(AbstractAjaxProcessor, { ... })` — the same
prototype-extension pattern used throughout the platform's own Script Includes, just pointed at
this specific base class instead of a custom one.

## The "Client callable" checkbox

Extending `AbstractAjaxProcessor` is necessary, but it's not sufficient on its own. The Script
Include record itself has a **Client callable** checkbox, and it must be checked for GlideAjax to
be allowed to reach any method on it at all. This is a real, required security setting — by
default, Script Includes are *not* client callable, which keeps server-side utility code from
being accidentally exposed to the browser. You turn it on deliberately, only for Script Includes
meant to serve as GlideAjax targets.

## Reading a parameter and returning a result

Inside a callable method, `this.getParameter('sysparm_paramName')` reads a value the client sent.
Parameter names are exactly what the client used when it called `addParam()` — this lesson's
example reads `sysparm_active`, which the next lesson's client script will set directly.
Whatever the method returns becomes the answer the client's callback eventually receives.

```javascript
var FreezeWindowChecker = Class.create();
FreezeWindowChecker.prototype = Object.extendsObject(AbstractAjaxProcessor, {

  // Public method - callable from the client because the Script Include
  // record has "Client callable" checked, and this name has no underscore.
  checkDateRange: function() {
    var start = this.getParameter('sysparm_start');
    var end = this.getParameter('sysparm_end');
    return this._hasOverlap(start, end) ? 'true' : 'false';
  },

  // Private helper - the leading underscore hides this from the client,
  // even though the Script Include itself is client callable.
  _hasOverlap: function(start, end) {
    // comparison logic would live here
    return false;
  },

  type: 'FreezeWindowChecker'
});
```

## The underscore convention: a real security line, not a style choice

Any method whose name starts with an underscore — like `_hasOverlap` above — is **not** callable
from the client, even when the Script Include as a whole is marked Client callable. This is a
real, enforced convention, not just a naming suggestion: the underscore is how you write internal
helper logic inside a client-callable Script Include without accidentally exposing it as a second
entry point. Only methods with plain, public-looking names — like `checkDateRange` — are reachable
by a GlideAjax call's `sysparm_name` parameter.

## Key terms

| Term | Meaning |
|---|---|
| AbstractAjaxProcessor | The real base class a Script Include must extend to be a valid GlideAjax target |
| Client callable | A required checkbox on the Script Include record; must be checked for GlideAjax to reach it |
| `getParameter()` | Reads a value the client sent via `addParam()`, by its `sysparm_` name |
| Underscore-prefixed method | A method name starting with `_`; never reachable from the client, even on a callable Script Include |

## Check yourself

Without looking back: name the two separate things a Script Include needs before GlideAjax can
call it at all, and explain why a method named `_hasOverlap` still can't be called even once both
of those things are true.
