# Lesson 12 — Lightning Web Components

**Chapter 3 · Build: UI and Integration · Lesson 12 of 25**

## What you'll learn

- What a Lightning Web Component is and how it differs from an Aura component
- The `@api` and `@track` decorators, and when each one is the right choice
- A real component for this platform: `technicianJobBoard`
- LWC's folder structure and lifecycle hooks

## What LWC actually is

A **Lightning Web Component (LWC)** is a component built on modern web standards — plain HTML, JavaScript, and the browser's native Custom Elements and Shadow DOM APIs — rather than a Salesforce-proprietary framework. It's Salesforce's current, recommended component model, succeeding the older Aura framework; Aura still runs in existing orgs, but new development on the platform defaults to LWC, which is why this capstone builds `technicianJobBoard` as one. A Lightning Web Component is just a folder with a specific set of files:

```
technicianJobBoard/
├── technicianJobBoard.js
├── technicianJobBoard.html
├── technicianJobBoard.js-meta.xml
```

The `.js-meta.xml` file declares the component's API version and where it's allowed to be used (a Lightning App Page, a record page, a tab) — without it, the component exists in your code but Setup won't let you drag it onto a page.

## Building the technician job board

This component shows the current technician their assigned, not-yet-completed `Installation_Job__c` records, pulling the Asset serial number and Case subject in using the relationship query pattern from Lesson 8.

```html
<!-- technicianJobBoard.html -->
<template>
    <lightning-card title="My Jobs Today" icon-name="standard:case">
        <template for:each={jobs} for:item="job">
            <div key={job.Id} class="slds-p-around_small slds-border_bottom">
                <p><strong>{job.Case__r.Subject}</strong></p>
                <p>{job.Asset__r.SerialNumber} — {job.Status__c}</p>
                <lightning-button label="Mark In Progress" data-id={job.Id}
                    onclick={handleMarkInProgress}></lightning-button>
            </div>
        </template>
    </lightning-card>
</template>
```

```javascript
// technicianJobBoard.js
import { LightningElement, api, wire } from 'lwc';
import getMyJobs from '@salesforce/apex/TechnicianJobBoardController.getMyJobs';
import updateJobStatus from '@salesforce/apex/TechnicianJobBoardController.updateJobStatus';
import { refreshApex } from '@salesforce/apex';

export default class TechnicianJobBoard extends LightningElement {
    @api recordId; // set automatically when placed on a record page

    wiredJobsResult;

    @wire(getMyJobs)
    wiredJobs(result) {
        this.wiredJobsResult = result;
    }

    get jobs() {
        return this.wiredJobsResult?.data ?? [];
    }

    handleMarkInProgress(event) {
        const jobId = event.target.dataset.id;
        updateJobStatus({ jobId: jobId, newStatus: 'In Progress' })
            .then(() => refreshApex(this.wiredJobsResult))
            .catch((error) => {
                this.dispatchEvent(
                    new CustomEvent('joberror', { detail: error.body.message })
                );
            });
    }
}
```

## `@api` vs. `@track`, and why this component barely needs either

`@api` marks a property as **public** — settable from outside the component, by a parent component or by Lightning App Builder when the component sits on a record page. `recordId` is `@api` here because the platform itself sets it automatically when this component is placed on a Case or Asset record page. `@track` (from LWC's earlier versions) marked a property as reactive so the template re-renders when it changes; modern LWC reactivity tracks simple fields automatically without `@track`, and the decorator is now mostly needed only for mutating a property *inside* an object or array in place. This component doesn't use `@track` at all — `wiredJobsResult` is reassigned outright by the wire adapter, which modern LWC already re-renders on, and `jobs` is a getter computed fresh from it each time.

## Lifecycle hooks

LWC components have lifecycle hooks similar to other component frameworks: `connectedCallback()` runs when the component is inserted into the DOM, `renderedCallback()` runs after every render, and `disconnectedCallback()` runs on removal. `technicianJobBoard` doesn't need any of them because `@wire` handles data loading declaratively on its own — reaching for `connectedCallback()` to manually call an imperative Apex method is the right move only when `@wire`'s reactive, cached behavior genuinely doesn't fit (covered in Lesson 13).

## Key terms

| Term | Meaning |
|---|---|
| Lightning Web Component | Salesforce's current component model, built on native web standards (Custom Elements, Shadow DOM) |
| `.js-meta.xml` | Metadata file declaring a component's API version and where it can be used |
| `@api` | Decorator marking a property or method as public, settable from outside the component |
| `@track` | Decorator forcing reactivity for in-place mutations of an object/array property; rarely needed for simple fields |
| Lifecycle hook | A method (`connectedCallback`, `renderedCallback`, `disconnectedCallback`) called automatically at a point in a component's life |

## Lab

Build `technicianJobBoard` in your scratch org (stub `TechnicianJobBoardController` with a hardcoded test list for now — Lesson 13 builds the real Apex controller). Add it to a Lightning App Page and confirm it renders the stubbed jobs.

## Check yourself

- Why is `recordId` marked `@api` on this component?
- What replaced Aura as Salesforce's recommended component model, and why does this capstone use it?
- Why doesn't `technicianJobBoard` need `@track` anywhere in its code?
