# Lesson 13 — Lightning Web Components: Data and Events

**Chapter 3 · Build: UI and Integration · Lesson 13 of 25**

## What you'll learn

- The Apex controller `technicianJobBoard` actually calls, and the `@AuraEnabled(cacheable=true)` pattern behind `@wire`
- Imperative Apex calls, and when they're the right choice over `@wire`
- Custom events: how a child component tells its parent something happened
- Why the finished job board needs both patterns, not just one

## The Apex controller behind `@wire`

Lesson 12's `@wire(getMyJobs)` needs a real Apex method on the other end. `@wire`-compatible methods have a specific requirement: they must be `@AuraEnabled(cacheable=true)`, which tells the Lightning Data Service layer it can cache the result and reuse it across components without re-querying every time.

```apex
public with sharing class TechnicianJobBoardController {

    @AuraEnabled(cacheable=true)
    public static List<Installation_Job__c> getMyJobs() {
        return [
            SELECT Id, Status__c, Scheduled_Date__c, Case__r.Subject, Asset__r.SerialNumber
            FROM Installation_Job__c
            WHERE Technician__c = :UserInfo.getUserId()
              AND Status__c != 'Completed'
            ORDER BY Scheduled_Date__c ASC
        ];
    }

    @AuraEnabled
    public static void updateJobStatus(Id jobId, String newStatus) {
        Installation_Job__c job = new Installation_Job__c(Id = jobId, Status__c = newStatus);
        update job;
    }
}
```

Notice `updateJobStatus` is **not** `cacheable=true` — a method that performs DML must not be cacheable, because caching assumes calling it again without new input should safely return the same result, which is never true for a method that writes data. This is why Lesson 12's JavaScript calls `getMyJobs` through `@wire` but calls `updateJobStatus` a different way entirely.

## Imperative Apex: the other way to call a method

`@wire` is declarative — the framework decides when to call the method (on load, on reactive parameter change) and manages the result for you. An **imperative** Apex call is one your own JavaScript code decides to make, at a moment you choose — exactly what `updateJobStatus` needs, since it should only run when a technician clicks the button, not automatically on every render:

```javascript
import updateJobStatus from '@salesforce/apex/TechnicianJobBoardController.updateJobStatus';
// ...
updateJobStatus({ jobId: jobId, newStatus: 'In Progress' })
    .then(() => refreshApex(this.wiredJobsResult))
    .catch((error) => { /* handle error */ });
```

The rule of thumb: if the data should load automatically and refresh when its inputs change, use `@wire`; if the call is the direct result of a user action and you need to control exactly when it fires, call it imperatively and handle the returned Promise yourself.

## Custom events: a child telling its parent something happened

`technicianJobBoard` might live inside a larger parent component — say, a "Service Dashboard" component that also shows a summary count of in-progress jobs. When a job's status changes, the parent needs to know, but a child component in LWC can't call a method on its parent directly; the data only flows down through `@api` properties. The fix is a **custom event**, dispatched by the child and listened for by the parent:

```javascript
// Inside technicianJobBoard.js, after a successful status update:
this.dispatchEvent(new CustomEvent('statuschange', {
    detail: { jobId: jobId, newStatus: 'In Progress' }
}));
```

```html
<!-- In the parent component's template -->
<c-technician-job-board onstatuschange={handleStatusChange}></c-technician-job-board>
```

```javascript
// In the parent component's JS
handleStatusChange(event) {
    const { jobId, newStatus } = event.detail;
    this.inProgressCount += newStatus === 'In Progress' ? 1 : 0;
}
```

Salesforce lowercases custom event names automatically, so `statuschange` (not `statusChange`) is what the parent's markup listens for, even though the JavaScript dispatches it as a plain string — an easy mismatch to introduce by typing a camelCase event name and wondering why the parent never hears it.

## When this platform would reach for Lightning Message Service instead

Custom events only work between components with a direct parent-child relationship. If the "Service Dashboard" summary lived on a completely different part of the page with no parent-child relationship to the job board — for instance, a separate Lightning App Page region — events alone wouldn't reach it, and this platform would use **Lightning Message Service** instead, which lets unrelated components publish and subscribe to messages across the DOM. This capstone's components stay in a direct parent-child relationship, so custom events are the right and sufficient tool here.

## Key terms

| Term | Meaning |
|---|---|
| `@AuraEnabled(cacheable=true)` | Marks an Apex method as safe for `@wire` to cache; required for `@wire`, forbidden on methods that perform DML |
| Imperative Apex call | A JavaScript-initiated call to an Apex method, fired at a moment the component chooses, returning a Promise |
| Custom event | An event a child component dispatches that a parent listens for, carrying data in `event.detail` |
| Lightning Message Service | Cross-DOM publish/subscribe messaging for components without a parent-child relationship |

## Lab

Implement `TechnicianJobBoardController` as shown above. Wire `technicianJobBoard`'s `getMyJobs` call to it, call `updateJobStatus` imperatively from the button handler, and add a `statuschange` custom event dispatch after a successful update. Build a small parent component that listens for it and displays a running count.

## Check yourself

- Why must `updateJobStatus` not be marked `cacheable=true`?
- What's the rule of thumb for choosing `@wire` versus an imperative Apex call?
- Why would two sibling components with no parent-child relationship need Lightning Message Service instead of a custom event?
