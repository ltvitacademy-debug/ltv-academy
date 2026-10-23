# Lesson 15 — Capstone: Build the Service Workflows

**Chapter 5 · Capstone: Build It · Lesson 15 of 26**

## What you'll learn

- How Lesson 14's approved Phase 1 scope turns into a concrete build backlog: catalog items,
  categories, and flows
- How the shared top-category/domain-subcategory compromise becomes a real catalog structure,
  not just a sentence in a requirements document
- How one Flow Designer flow routes a request to the correct domain's assignment group, using
  the caller's own domain instead of three near-duplicate flows
- How a reusable approval subflow handles Access-category requests without being rebuilt per
  hospital system
- Why every piece built in this lesson has to work inside Technical Architecture's Domain
  Separation structure, not around it

## From approved scope to build backlog

Lesson 14 left you with a written Phase 1 scope: incident management and request management on
one shared service catalog front door, built on a shared top-category/domain-subcategory model,
with domain-scoped queues and a staged go-live. That document is the backlog for this lesson,
item by item. Nothing here is invented fresh — every catalog item, category, and flow you build
has to trace back to a line in that scope, and anything not in scope (HR service delivery,
facilities management, a virtual agent front end) stays out, exactly as Lesson 14 decided.

## The shared service catalog front door

Phase 1 needs two catalog items doing real work for all three domains at once: **Report an IT
Issue** (creates an Incident) and **Request IT Service** (creates a Service Catalog request).
Both share one variable set built around Lesson 14's resolved category conflict: a **Request
Category** choice list fixed at the corporate level — Hardware, Software, Access,
Facilities-Adjacent, Other — followed by a **Subcategory** reference field that filters to records
owned by the caller's own domain. St. Catherine's subcategory list keeps its multi-tier detail
(Hardware > Laptop > Docking Station); Lakeshore keeps its flatter, locally-tuned list; Prairie
View gets a short starting list instead of free text. All three sit under the same five top
categories, so Meridian's corporate reporting rolls up cleanly, and no domain is forced onto
another domain's scheme.

## Domain-scoped assignment: one flow, three domains

The naive build is three nearly-identical flows, one per hospital system. That's exactly the
duplication this track's Flow Designer course warned against — a single flow, triggered once on
record creation for both catalog items, that reads the caller's own domain and looks up the
correct assignment group is both less work to maintain and the only version that actually proves
the architecture holds up: a Lakeshore request has to land with a Lakeshore group every time, with
no per-domain flow to accidentally drift out of sync with the other two. The flow's trigger fires
on `sc_req_item` creation; an if/else condition checks whether the category is Access (routing to
the approval subflow below) or anything else (routing straight to assignment); a Script step calls
a small Script Include to resolve the actual group:

```javascript
var ServiceDeskRouting = Class.create();
ServiceDeskRouting.prototype = {
    initialize: function() {},

    // Returns the assignment group that owns Service Desk work in the
    // caller's own domain -- never a group borrowed from another domain.
    getAssignmentGroupForCaller: function(callerSysId) {
        var caller = new GlideRecord('sys_user');
        if (!caller.get(callerSysId)) {
            throw new Error('Unknown caller: ' + callerSysId);
        }
        var callerDomain = caller.getValue('sys_domain');

        var map = new GlideRecord('u_domain_service_desk_group');
        map.addQuery('u_domain', callerDomain);
        map.query();
        if (map.next()) {
            return map.getValue('u_assignment_group');
        }
        // No mapping found for this domain -- fail safe to the corporate
        // default queue rather than guessing at a domain-specific group.
        return gs.getProperty('u_default_service_desk_group');
    },

    type: 'ServiceDeskRouting'
};
```

The flow's final step updates the request's `assignment_group` field with whatever this function
returns. One flow, one Script Include, three correct outcomes — and a documented fallback instead
of a silent failure if a domain's mapping is ever missing.

## A reusable approval subflow for Access requests

Access-category requests — a new application login, an elevated permission — need manager
approval before fulfillment, and that approval has to respect domain boundaries exactly as
tightly as assignment does: a Lakeshore employee's request should never get approved by someone
outside Lakeshore's own domain by accident. Rather than embed that logic three times, it's a
single reusable subflow with one input (the request's sys_id) and one output (approved or
rejected), called from the main flow's Access branch. The subflow's own Script step resolves the
approver and checks the domain boundary before handing off to the built-in Approval action:

```javascript
var ServiceDeskApprovals = Class.create();
ServiceDeskApprovals.prototype = {
    initialize: function() {},

    // Used by the Access-category approval subflow. Returns the
    // requester's own manager, but only if that manager sits in the
    // same domain as the requester -- Domain Separation should already
    // guarantee that, but this re-checks it instead of assuming it.
    getApproverForAccessRequest: function(requestedForSysId) {
        var user = new GlideRecord('sys_user');
        if (!user.get(requestedForSysId)) return null;

        var manager = user.manager;
        if (!manager) return null;

        if (manager.sys_domain.toString() != user.sys_domain.toString()) {
            gs.error('Cross-domain manager mismatch for ' + requestedForSysId);
            return null; // fail closed -- never auto-route approval across a domain boundary
        }
        return manager.sys_id.toString();
    },

    type: 'ServiceDeskApprovals'
};
```

That "fail closed" line matters as much as the happy path: if the domain check ever fails, the
subflow refuses to guess at an approver rather than risk routing an approval across a domain
boundary that was never supposed to be crossed.

## Key terms

| Term | Meaning |
|---|---|
| Catalog variable set | The shared Request Category / Subcategory fields reused across both catalog items |
| Domain-scoped assignment group | The group that owns Service Desk work for one specific domain, never shared across domains |
| Reusable subflow | One approval subflow called from all three domains' Access-category requests, instead of three copies |
| Fail closed | Refusing to guess at an answer (an assignment group, an approver) when the correct one can't be confirmed |

## Check yourself

A new engineer on the team proposes building three separate Flow Designer flows — one per
hospital system — because "it'll be easier to customize later." Using this lesson's domain-routing
Script Include as your example, explain why one domain-aware flow is actually the safer choice,
not just the smaller one.
