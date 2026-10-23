# Lesson 16 — Capstone: Build the Platform Integrations

**Chapter 5 · Capstone: Build It · Lesson 16 of 26**

## What you'll learn

- Why Lesson 15's domain-routing script is useless without one specific integration Technical
  Architecture already decided: syncing worker records into `sys_user`
- Why this integration is a scheduled pull against Prairie View Health Partners' homegrown
  system, not a webhook
- The real REST Message and Script Include that pull changed worker records on a schedule
- The upsert logic that writes those records into `sys_user`, coalesced on an external employee ID
- Why St. Catherine's (Workday) and Lakeshore (ADP Workforce Now) follow the same shape, without
  rebuilding all three integrations in one lesson

## Why this workstream needs an integration at all

Lesson 15's domain-routing Script Include reads `caller.getValue('sys_domain')` and assumes that
value is correct. That assumption only holds if the caller's `sys_user` record actually exists in
ServiceNow, tagged to the right domain, before anyone opens the Service Desk catalog. Technical
Architecture's integration architecture already decided where that data comes from for each
hospital system: Workday for St. Catherine's, ADP Workforce Now for Lakeshore, and a homegrown
PeopleSoft-based module for Prairie View. This lesson builds one of those three integrations in
real depth -- Prairie View's -- because it's the one with the least modern API surface, and
therefore the one most likely to teach a lesson the other two won't.

## Choosing pull over push for a homegrown system

Chapter 1 of this track's IntegrationHub course laid out the real integration patterns available,
and the choice here comes down to one practical fact: Prairie View's homegrown, PeopleSoft-based
module was never built to call out to anything. It has no webhook capability, no event bus, no
way to notify ServiceNow that a worker record changed. What it does have is a read endpoint. That
rules out an inbound, event-driven design outright -- there's no event to receive -- and leaves a
**scheduled pull**: a Script Include, run on a schedule, that asks Prairie View's system "what
changed since I last checked?" The real cost of this choice is a staleness window -- a worker
record can be up to one sync interval out of date -- which Phase 1 accepts as reasonable for HR
data feeding a help desk, not a payroll system.

## The REST Message and the Script Include that calls it

Prairie View's system authenticates with a static API key rather than OAuth -- consistent with a
legacy system that predates the OAuth 2.0 support Chapter 3 of the IntegrationHub course covered
for St. Catherine's and Lakeshore's more modern platforms. The REST Message `PrairieViewHR`
exposes one Function, `getChangedWorkers`, called from a Script Include that a Scheduled Job runs
every fifteen minutes:

```javascript
var PrairieViewWorkerSync = Class.create();
PrairieViewWorkerSync.prototype = {
    initialize: function() {},

    pullChangedWorkers: function(sinceTimestamp) {
        var r = new sn_ws.RESTMessageV2('PrairieViewHR', 'getChangedWorkers');
        r.setStringParameterNoEscape('since', sinceTimestamp);
        r.setRequestHeader('X-PV-API-Key', gs.getProperty('u_pv_hr_api_key'));

        var response = r.execute();
        var status = response.getStatusCode();
        if (status != 200) {
            gs.error('PrairieViewHR sync failed: ' + status + ' ' + response.getBody());
            return [];
        }
        return JSON.parse(response.getBody()).workers;
    },

    type: 'PrairieViewWorkerSync'
};
```

A non-200 response is logged and returns an empty array rather than letting a bad response reach
the upsert step below -- the same "never pass through what you haven't verified" discipline this
track's error-handling lesson taught.

## Upserting into `sys_user`, correctly domain-tagged

Each worker record Prairie View returns gets written into `sys_user` through an upsert, coalesced
on `u_prairie_employee_id` -- the same pattern this track's Retry Strategies & Idempotency lesson
used for incident records, applied here to people instead of tickets. A record that's never been
seen before gets created and explicitly tagged to Prairie View's domain; a record that already
exists gets its name, department, and active status refreshed:

```javascript
upsertWorker: function(worker) {
    var gr = new GlideRecord('sys_user');
    gr.addQuery('u_prairie_employee_id', worker.employeeId); // coalesce field
    gr.query();

    var isNew = !gr.next();
    if (isNew) {
        gr.initialize();
        gr.sys_domain = PRAIRIE_VIEW_DOMAIN_ID; // new records: tag to Prairie View's domain
        gr.u_prairie_employee_id = worker.employeeId;
    }

    gr.first_name = worker.firstName;
    gr.last_name = worker.lastName;
    gr.department = worker.department;
    gr.active = (worker.status === 'active');

    isNew ? gr.insert() : gr.update();
}
```

Run this against every worker Prairie View reports changed, on a fifteen-minute schedule, and
Lesson 15's routing script has real, current, correctly domain-tagged callers to resolve --
provided the record it's reading was tagged correctly in the first place. Lesson 17's test plan
checks that assumption directly, rather than taking it on faith.

## One pattern, two integrations deferred on purpose

St. Catherine's Workday integration and Lakeshore's ADP Workforce Now integration follow this
exact shape -- a pull or push against a vendor API, coalesced on an external ID, domain-tagged on
write -- but with modern, documented webhook or OAuth-based APIs behind them instead of a
homegrown read endpoint. Building all three in this lesson would repeat the same pattern three
times without teaching anything new; Phase 1's actual backlog builds them on the same template,
and this lesson exists to prove the template against the hardest case, not the easiest one.

## Key terms

| Term | Meaning |
|---|---|
| Scheduled pull | An integration that asks an external system for changes on a timer, instead of waiting for a push |
| `u_prairie_employee_id` | The coalesce field that lets a retried or repeated sync update, not duplicate, a worker record |
| Staleness window | The maximum delay between a real-world change and ServiceNow reflecting it, set by the sync interval |
| Domain-tagged write | Explicitly setting a record's `sys_domain` on write, rather than letting it inherit a default |

## Check yourself

Prairie View's homegrown system has no webhook capability at all. Using this lesson's reasoning,
explain why a scheduled pull was the only realistic integration pattern available here -- and
what real cost Phase 1 accepted by choosing it.
