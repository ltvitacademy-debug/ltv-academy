# Lesson 36 — Capstone: Build Server & Client Scripts

**Chapter 9 · Capstone: a Custom Scoped Application · Lesson 36 of 37**

## What you'll learn

- A real class-based Script Include that checks whether equipment is available
- A real "before insert" Business Rule that enforces that rule server-side
- A real ajax-callable wrapper, and why it's a separate Script Include from the logic itself
- A real Client Script using GlideAjax to warn the user before they even submit

## The Script Include: the one source of truth

Everything in this lesson needs to answer one question the same way every time: *is this
equipment currently checked out?* Chapter 3 taught exactly this pattern — put the logic in one
class-based Script Include, and call it from everywhere that needs the answer, instead of copying
the same query into a Business Rule and a Client Script separately.

```javascript
var EquipmentAvailabilityChecker = Class.create();
EquipmentAvailabilityChecker.prototype = {
    initialize: function() {},

    isEquipmentAvailable: function(equipmentId) {
        var gr = new GlideRecord('x_acme_eqchk_request');
        gr.addQuery('equipment', equipmentId);
        gr.addQuery('state', 'IN', '2,3'); // 2 = Approved, 3 = Checked Out
        gr.addQuery('active', true);
        gr.query();

        return !gr.hasNext();
    },

    type: 'EquipmentAvailabilityChecker'
};
```

`isEquipmentAvailable()` looks for any active request against that same equipment sitting in
Approved or Checked Out state. If `gr.hasNext()` finds one, the equipment is unavailable — note
the use of `hasNext()` rather than `getRowCount()`, which matters for the performance review ahead
in Lesson 37. Per Lesson 35, this Script Include's Application Access is set to "This application
scope only."

## The Business Rule: the authoritative check

A Client Script can warn a user, but it can never be trusted as the only safeguard — anyone who
can reach the API directly bypasses client-side JavaScript entirely. The real enforcement belongs
in a **before insert** Business Rule on `x_acme_eqchk_request`, the same before/after distinction
Lesson 2 covered:

```javascript
(function executeRule(current, previous /*null when async*/) {

    var checker = new x_acme_eqchk.EquipmentAvailabilityChecker();

    if (!checker.isEquipmentAvailable(current.equipment.toString())) {
        gs.addErrorMessage('This equipment is already checked out and cannot be ' +
            'requested again until it is returned.');
        current.setAbortAction(true);
    }

})(current, previous);
```

Because this Business Rule runs **before** the insert and calls `current.setAbortAction(true)`,
a duplicate request for already-checked-out equipment never reaches the database — no matter how
the insert was triggered.

## The ajax-callable wrapper

A Client Script cannot call `EquipmentAvailabilityChecker` directly with GlideAjax — GlideAjax
only calls a Script Include that extends `AbstractAjaxProcessor`. The clean pattern is a second,
thin Script Include dedicated to that bridge, which simply delegates to the real logic:

```javascript
var EquipmentAvailabilityCheckerAjax = Class.create();
EquipmentAvailabilityCheckerAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    isEquipmentAvailable: function() {
        var equipmentId = this.getParameter('sysparm_equipment_id');
        var checker = new x_acme_eqchk.EquipmentAvailabilityChecker();
        return checker.isEquipmentAvailable(equipmentId);
    }

});
```

Keeping the real logic in `EquipmentAvailabilityChecker` and the ajax plumbing in a separate
wrapper means the same business logic serves both the server-side Business Rule and the
client-side GlideAjax call, with no duplication.

## The Client Script: a warning, not the enforcement

An `onChange` Client Script on the `equipment` field calls the wrapper and shows an immediate
warning — purely for user experience, since the Business Rule above is what actually protects the
data:

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    var ga = new GlideAjax('EquipmentAvailabilityCheckerAjax');
    ga.addParam('sysparm_name', 'isEquipmentAvailable');
    ga.addParam('sysparm_equipment_id', newValue);

    ga.getXMLAnswer(function(answer) {
        if (answer === 'false') {
            g_form.addErrorMessage('This equipment is already checked out. ' +
                'Choose a different item.');
        }
    });
}
```

This is the same isolate-script-aware pattern Chapter 2 covered — no DOM access, no jQuery,
nothing that would conflict with the client-side sandbox. It just reads a form value, makes an
async GlideAjax call, and uses `g_form.addErrorMessage()` for feedback.

## Key terms

| Term | Meaning |
|---|---|
| Class-based Script Include | Reusable server-side logic, defined once and called from multiple places |
| `setAbortAction(true)` | Called in a before Business Rule to stop the database operation entirely |
| `AbstractAjaxProcessor` | The base class a Script Include must extend to be callable via GlideAjax |
| `getXMLAnswer()` | The GlideAjax client callback that receives the server method's return value as a string |

## Check yourself

Without looking back: why can't the Client Script call `EquipmentAvailabilityChecker` directly
with GlideAjax, and what's the real reason the Business Rule — not the Client Script — is what
actually prevents a duplicate checkout?
