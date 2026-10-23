# Lesson 14 — Versioning a Scripted REST API

**Chapter 4 · Exposing ServiceNow Data via REST · Lesson 14 of 29**

## What you'll learn

- Why a Scripted REST API needs versioning at all — the real problem it solves
- How a Version record contributes its own base-path segment under one API definition
- What actually changes between a v1 and a v2 Resource script, in practice
- Why old callers keep working unchanged after a new version ships

## The problem versioning solves

A Scripted REST API gets consumed by other systems — code outside ServiceNow, often outside the
team's own control. The moment an external integration calls it, changing that Resource's request
or response shape becomes risky: adding a required field, renaming a response property, or
changing a date format can silently break every caller still using the old shape, with no warning
until something fails downstream. A developer still needs to evolve the API over time — fix a
design mistake, add a field a new consumer needs — without forcing every existing caller to change
on the developer's schedule. That's exactly what **versioning** a Scripted REST API is for.

## One API definition, multiple Version records

Each Scripted REST API (`sys_ws_definition`) can have multiple **Version** records attached to
it. Every Version contributes its own base-path segment, inserted between the API's base path and
each Resource's relative path:

```
API base path: /api/x_acme_eqchk

Version v1 -> served at /api/x_acme_eqchk/v1/...
Version v2 -> served at /api/x_acme_eqchk/v2/...
```

A Resource with relative path `/equipment/{sys_id}` is reachable at two different full URLs once
both versions exist:

```
GET /api/x_acme_eqchk/v1/equipment/{sys_id}   -> the original shape
GET /api/x_acme_eqchk/v2/equipment/{sys_id}   -> the new shape
```

Both URLs are live at the same time. Nothing about creating v2 removes or disables v1 — a Version
is additive, not a replacement, until a team deliberately decides to retire the old one.

## What actually changes between versions

Say v1's GET resource for `/equipment/{sys_id}` returns this shape:

```javascript
// v1 — GET /api/x_acme_eqchk/v1/equipment/{sys_id}
(function process(request, response) {

    var gr = new GlideRecord('x_acme_eqchk_equipment');
    if (!gr.get(request.pathParams.sys_id)) {
        response.setStatus(404);
        response.setBody({ error: 'No equipment found' });
        return;
    }

    response.setBody({
        asset_tag: gr.getValue('asset_tag'),
        equipment_name: gr.getValue('equipment_name'),
        condition: gr.getValue('equipment_condition')
    });

})(request, response);
```

Suppose a new consumer needs the equipment's current checkout status too — not just the item's
own fields, but whether it's currently loaned out. Adding that to v1 directly would change what
every existing v1 caller receives, even callers who never asked for it. Instead, that change
belongs in a new Resource, under a new Version:

```javascript
// v2 — GET /api/x_acme_eqchk/v2/equipment/{sys_id}
(function process(request, response) {

    var gr = new GlideRecord('x_acme_eqchk_equipment');
    if (!gr.get(request.pathParams.sys_id)) {
        response.setStatus(404);
        response.setBody({ error: 'No equipment found' });
        return;
    }

    var req = new GlideRecord('x_acme_eqchk_request');
    req.addQuery('equipment', gr.getUniqueValue());
    req.addQuery('active', true);
    req.orderByDesc('sys_created_on');
    req.setLimit(1);
    req.query();

    response.setBody({
        asset_tag: gr.getValue('asset_tag'),
        equipment_name: gr.getValue('equipment_name'),
        condition: gr.getValue('equipment_condition'),
        checked_out: req.next(),
        current_requester: req.isValidRecord() ? req.requested_for.getDisplayValue() : null
    });

})(request, response);
```

v2's script is a separate Resource with its own separate script — it isn't v1's script with an
`if` branch added inside it. That separation is deliberate: v1's script never changes, so v1's
behavior never changes either.

## Why old callers keep working unchanged

This is the real, practical payoff: an integration still calling
`/api/x_acme_eqchk/v1/equipment/{sys_id}` keeps receiving exactly the response shape it was built
against, forever, regardless of what v2 adds. The team can ship v2 the moment it's ready, let the
new consumer start using it immediately, and migrate the old integration to v2 on its own schedule
— or never, if it genuinely never needs the new field. Nobody has to coordinate a simultaneous
cutover across every system calling the API, which is the real cost versioning avoids: a breaking
change rolled out to everyone at once, on one team's timeline, with no way to opt out.

## Key terms

| Term | Meaning |
|---|---|
| Version record | A record on a Scripted REST API that contributes its own base-path segment (e.g., `v1`, `v2`) |
| Base-path segment | The version's own URL piece, inserted between the API's base path and a Resource's relative path |
| Additive versioning | Adding a new Version doesn't remove or change an existing one — both stay live |
| Breaking change | A shape change (renamed field, new required field) that would alter what existing callers receive |

## Check yourself

Without looking back: why does adding a new field to a v2 Resource's response require a new
Resource script entirely, rather than just adding an `if` branch inside the existing v1 script?
