# Lesson 27 — Widgets & Portal Pages

**Chapter 7 · Service Portal & End-User Experience · Lesson 27 of 32**

## What you'll learn

- The four real parts of a Widget (`sp_widget`): HTML Template, CSS/SCSS, Server Script, Client Controller
- How the Server Script uses GlideRecord to populate a `data` object — the same API from earlier chapters, used server-side
- How `ng-repeat` and `{{ }}` interpolation in the HTML Template loop over that data
- How the Client Controller's `$scope` (or `c`, the controller-as alias) connects a button click back to the page
- How a widget, once built, gets dropped onto a Page from Lesson 26

## The widget is the real building block

Lesson 26 named Portal, Theme, and Page as the three configuration layers — but none of those actually render content. The thing that renders content, placed on a Page, is a **Widget**, stored on the `sp_widget` table. A widget is a small, reusable component — "my open incidents," "a knowledge search box," "a catalog item card" — and every widget is built from exactly four parts:

```text
Widget (sp_widget)
  |
  +-- HTML Template      -- the markup, AngularJS directives + {{ }} interpolation
  +-- CSS / SCSS          -- styling scoped to this widget
  +-- Server Script       -- runs server-side; builds the "data" object with GlideRecord
  +-- Client Controller   -- AngularJS client JS; $scope connects data to the HTML
```

## Server Script: GlideRecord, running server-side, for this widget

The Server Script is where the GlideRecord skills from earlier in this course actually get used inside Service Portal. It runs once per page load (or widget refresh), queries whatever table the widget needs, and attaches the results to a `data` object that the HTML Template can read:

```javascript
// Server Script
(function() {
  data.incidents = [];

  var gr = new GlideRecord('incident');
  gr.addQuery('caller_id', gs.getUserID());
  gr.addQuery('active', true);
  gr.orderByDesc('sys_created_on');
  gr.setLimit(10);
  gr.query();

  while (gr.next()) {
    data.incidents.push({
      number: gr.getValue('number'),
      short_description: gr.getValue('short_description'),
      state: gr.getDisplayValue('state'),
      sys_id: gr.getUniqueValue()
    });
  }
})();
```

Every field pushed into `data.incidents` has to be a plain value (a string, number, or array of plain objects) — a GlideRecord object itself can't cross from server script to client, which is exactly why the script calls `getValue()` and `getDisplayValue()` instead of handing back `gr` directly.

## HTML Template: ng-repeat and interpolation

The HTML Template reads whatever the Server Script put on `data`, through the `c.data` alias the Client Controller exposes (covered next):

```html
<div class="panel panel-default">
  <div class="panel-heading">My Open Incidents</div>
  <ul class="list-group">
    <li class="list-group-item" ng-repeat="inc in c.data.incidents">
      <strong>{{inc.number}}</strong> — {{inc.short_description}}
      <span class="label label-info">{{inc.state}}</span>
      <button class="btn btn-xs btn-primary" ng-click="c.openIncident(inc)">
        View
      </button>
    </li>
  </ul>
</div>
```

`ng-repeat="inc in c.data.incidents"` loops once per element in the array the Server Script built; `{{ }}` interpolates a value straight into the rendered page; `ng-click` wires the button to a function on the Client Controller.

## Client Controller: $scope, c, and handling the click

The Client Controller is plain AngularJS-style JavaScript. Service Portal widgets commonly use the "controller as" pattern, where `c` is the alias referenced in the HTML (`c.data`, `c.openIncident`):

```javascript
// Client Controller
function($scope, spNavigator) {
  var c = this;
  // c.data is auto-populated from the Server Script's "data" object

  c.openIncident = function(inc) {
    spNavigator.openPage('ticket', null, { sys_id: inc.sys_id });
  };
}
```

`$scope` is injected because AngularJS 1.x controllers always receive it, even when, as here, most of the logic hangs off `c` (`this`) instead. `c.data` is populated automatically by the widget framework from the Server Script's output — no manual wiring required. `c.openIncident` is a plain function the HTML's `ng-click` calls directly.

## Dropping the widget onto a Page

Once the widget exists, an implementer opens the target Page from Lesson 26 in Service Portal's page designer and drags the widget into a container on that page's layout. The widget runs its Server Script every time that page loads, so the same "My Open Incidents" widget dropped onto the Homepage and onto a dedicated "My Work" page behaves identically in both places — because it's the same `sp_widget` record, configured once.

## Key terms

| Term | Meaning |
|---|---|
| Widget (`sp_widget`) | The reusable component placed on a Page: HTML Template + CSS + Server Script + Client Controller |
| Server Script | Runs server-side; uses GlideRecord to build a plain `data` object the widget exposes to the client |
| HTML Template | The widget's markup; uses AngularJS directives (`ng-repeat`, `ng-click`) and `{{ }}` interpolation |
| Client Controller | AngularJS client-side JS; `$scope` (or the `c` alias) connects `data` and functions to the HTML |
| `ng-repeat` | The AngularJS directive that loops the HTML once per element of an array |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why can't a Server Script hand a raw GlideRecord object to the Client Controller, and what does `ng-repeat="inc in c.data.incidents"` actually do when the page renders?
