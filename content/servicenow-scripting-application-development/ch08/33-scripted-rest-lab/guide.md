# Lesson 33 — Scripted REST Lab

**Chapter 8 · Scripted REST APIs & Script Actions · Lesson 33 of 37**

## What you'll learn

- How to combine a Scripted REST resource and a Script Action in one real scenario
- Writing a complete GET resource that returns JSON built from a GlideRecord lookup
- Writing a Script Action that reacts to a custom event raised from a Business Rule
- How the two mechanisms from this chapter connect end to end

## The scenario

Acme's fleet application (the same `x_acme_fleet_vehicle` and `x_acme_fleet_checkout` tables from
earlier in this course) needs two things:

1. An external dashboard needs to check a vehicle's current status over REST, without logging
   into the instance.
2. When a vehicle is checked back in, several related records need updating — and the team wants
   that reaction decoupled from whatever code marks the checkout as returned.

This lab builds both: a Scripted REST GET resource for the first requirement, and a Script Action
driven by a custom event for the second.

## Part 1 — the Scripted REST resource

**Setup:** a Scripted REST API named "Fleet API" with base path `/api/x_acme_fleet/vehicle`. Under
it, a Resource:

- Relative path: `/{sys_id}/status`
- HTTP method: GET

The full path a caller hits is `/api/x_acme_fleet/vehicle/{sys_id}/status` — GET, no body needed.

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var vehicleId = request.pathParams.sys_id;

    var veh = new GlideRecord('x_acme_fleet_vehicle');
    if (!veh.get(vehicleId)) {
        response.setStatus(404);
        response.setBody({ error: 'No vehicle found with sys_id ' + vehicleId });
        return;
    }

    // Find the vehicle's most recent checkout record, if any
    var co = new GlideRecord('x_acme_fleet_checkout');
    co.addQuery('vehicle', vehicleId);
    co.orderByDesc('sys_created_on');
    co.setLimit(1);
    co.query();

    var checkoutInfo = null;
    if (co.next()) {
        checkoutInfo = {
            checked_out_by: co.checked_out_by.getDisplayValue(),
            checkout_date: co.getValue('checkout_date'),
            status: co.getValue('status')
        };
    }

    response.setBody({
        vehicle_id: veh.getValue('vehicle_id'),
        make_model: veh.getValue('make') + ' ' + veh.getValue('model'),
        status: veh.getValue('status'),
        current_checkout: checkoutInfo
    });

})(request, response);
```

Walking through it: `request.pathParams.sys_id` pulls the vehicle's sys_id straight out of the
URL. `veh.get(vehicleId)` is the one-line GlideRecord lookup-by-sys_id you've used since this
course's earlier chapters — it returns `false` if nothing matches, which is exactly when the
script answers with a 404 instead of guessing. The second query finds that vehicle's most recent
checkout record, if one exists, using `orderByDesc()` and `setLimit(1)` to get just the latest
row. Everything gets assembled into one plain object and handed to `response.setBody()` — the
platform serializes it to JSON automatically.

A GET to `/api/x_acme_fleet/vehicle/<sys_id>/status` for a vehicle with an open checkout would
return something like:

```json
{
  "vehicle_id": "FL-0042",
  "make_model": "Ford Transit",
  "status": "checked_out",
  "current_checkout": {
    "checked_out_by": "Dana Reyes",
    "checkout_date": "2026-10-18 09:14:00",
    "status": "Checked Out"
  }
}
```

## Part 2 — the event and the Script Action

**The trigger:** a Business Rule on `x_acme_fleet_checkout`, set to run **after update**, with a
filter condition of `status changes to Returned`. Its script doesn't update the vehicle directly —
it just announces that the return happened:

```javascript
// Business Rule: Announce Vehicle Returned
// When: after update, condition: status changes to Returned

(function executeRule(current, previous /*null when async*/) {

    gs.eventQueue('vehicle.returned', current, current.vehicle.toString(), gs.getUserID());

})(current, previous);
```

`gs.eventQueue()` takes the event name, the `current` GlideRecord, and up to two extra string
parameters — here, the vehicle's sys_id and the returning user's sys_id, available later as
`event.parm1` and `event.parm2`.

**The listener:** a Script Action named "Update Vehicle on Return," listening for the event name
`vehicle.returned`:

```javascript
// Script Action: Update Vehicle on Return
// Fires on event: vehicle.returned

(function onVehicleReturned(event) {

    var vehicleId = event.parm1; // sys_id, passed from the Business Rule
    var returnedByUserId = event.parm2;

    var veh = new GlideRecord('x_acme_fleet_vehicle');
    if (!veh.get(vehicleId)) {
        gs.error('vehicle.returned event: no vehicle found for sys_id ' + vehicleId);
        return;
    }

    veh.status = 'available';
    veh.last_returned = new GlideDateTime();
    veh.last_returned_by = returnedByUserId;
    veh.update();

    gs.info('Script Action: vehicle ' + veh.getValue('vehicle_id') + ' marked available, returned by ' + returnedByUserId);

})(event);
```

## Why this design, not a Business Rule doing everything directly

The Business Rule could have updated the vehicle record itself, in the same script that detected
the status change. Instead, it only announces `vehicle.returned` and lets a separate Script Action
react. That separation means a second team could add their own listener for the same event — say,
an email alert, or a sync to an external fleet-tracking system — without ever touching the
Business Rule's code, and without the Business Rule's author needing to know those other
listeners exist. That's the loose coupling from the previous lesson, now doing real work in a
real scenario.

## Key terms

| Term | Meaning |
|---|---|
| Resource relative path | `/{sys_id}/status`, appended to the API's base path to form the full URL |
| `veh.get(vehicleId)` | One-line GlideRecord lookup by sys_id; returns false if no record matches |
| `event.parm1` / `event.parm2` | The extra arguments passed into `gs.eventQueue()`, read inside the Script Action |
| Decoupled reaction | The Business Rule announces an event; it never needs to know who (if anyone) is listening |

## Check yourself

Without looking back: in Part 2, why does the Business Rule call `gs.eventQueue()` instead of
updating the vehicle record directly in the same script — and what would it cost that design if a
second team later needed to react to the same return event?
