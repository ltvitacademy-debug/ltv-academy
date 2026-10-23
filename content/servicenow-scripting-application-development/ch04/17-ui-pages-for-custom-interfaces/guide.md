# Lesson 17 — UI Pages for Custom Interfaces

**Chapter 4 · UI Policies, UI Actions & UI Pages · Lesson 17 of 37**

## What you'll learn

- What a UI Page (`sys_ui_page`) is and when it's the right tool instead of a form
- Jelly: ServiceNow's older XML-based templating language, and its basic structure
- How a UI Page mixes HTML, Jelly tags, and embedded JavaScript in one record
- Honest context: Jelly/UI Pages as the legacy mechanism vs. UI Builder as the modern one
- A preview of where UI Pages still matter today: the body of a `GlideDialogWindow` popup

## When a form isn't the right shape

Every UI element this course has covered so far — Business Rules, Client Scripts, UI Policies, UI Actions — assumes there's a record, and a form built from that record's fields, driving the interaction. Sometimes that assumption doesn't hold. A custom multi-step wizard that walks a user through several unrelated choices before a record even exists, a summary dashboard combining data from several tables with no single "current record," or the contents of a popup dialog triggered by a button — none of these map cleanly onto a table's form. That's the gap a **UI Page**, stored on `sys_ui_page`, exists to fill: a standalone custom page with its own URL, built from scratch rather than generated from a table definition.

## Jelly: an XML templating language

A UI Page's HTML field is written in **Jelly**, an XML-based templating language that predates most of the modern platform. Jelly tags are recognized by their namespace prefixes — `g:` for ServiceNow's own custom tags, `j:` for Jelly's own core control-flow tags. A simple UI Page mixing plain HTML with Jelly looks like this:

```html
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
  <g:evaluate var="jvar_count" expression="gs.getUser().getName()" jelly="true"/>
  <div class="panel">
    <h2>Welcome, ${jvar_count}</h2>
    <j:if test="${jvar_count != null}">
      <p>Session is active.</p>
    </j:if>
  </div>
</j:jelly>
```

`<g:evaluate>` runs a server-side script expression at render time and stores the result in a `jvar_` prefixed variable — that naming convention (`jvar_`) is a strict Jelly convention, not optional. `<j:if>` is Jelly's own conditional tag, evaluated server-side while the page is being assembled, before any HTML reaches the browser. The variable is then interpolated into the markup with `${...}`.

## Mixing in real client-side JavaScript

A UI Page isn't limited to server-side Jelly — its HTML field can also contain a plain `<script>` block that runs exactly like JavaScript on any other web page, giving it access to the DOM it just rendered:

```html
<script>
function refreshSummary() {
    var countField = document.getElementById('countDisplay');
    countField.innerHTML = 'Updated at ' + new Date().toLocaleTimeString();
}
</script>
<button onclick="refreshSummary()">Refresh</button>
<span id="countDisplay"></span>
```

This is where a UI Page genuinely earns the name "custom interface" — Jelly decides what gets rendered server-side at page-build time, and ordinary JavaScript takes over once that HTML is sitting in the browser.

## Legacy, but still everywhere

Here's the honest context worth carrying forward: Jelly and UI Pages predate almost everything else in this course, and for most new custom-interface work today, **UI Builder** — the modern, component-based page builder covered in Course 2 — is the better tool. Jelly's XML syntax is verbose, its debugging story is weaker than modern JavaScript tooling, and it isn't the direction ServiceNow is investing new platform capability into. UI Pages still matter, though, because an enormous amount of existing platform functionality and customer customization was built on them over the better part of two decades, and that code doesn't disappear — a developer maintaining an established instance will run into `sys_ui_page` records regularly, whether or not they'd choose Jelly for something brand new. One specific, still-current use case is worth flagging now and will come back in depth in Chapter 7: a UI Page is exactly what you point a `GlideDialogWindow` at to supply the custom body of a popup dialog launched from a button or UI Action.

## Key terms

| Term | Meaning |
|---|---|
| UI Page | A `sys_ui_page` record: a standalone custom page not tied to one record's form |
| Jelly | ServiceNow's older XML-based templating language used in a UI Page's HTML field |
| `g:evaluate` | Jelly tag that runs a server-side script and stores the result in a `jvar_` variable |
| `jvar_` | Required naming convention for variables set by Jelly tags like `g:evaluate` |
| `GlideDialogWindow` | Client-side popup mechanism (Chapter 7) that can load a UI Page as its body |

## Check yourself

Explain, in your own words, why a multi-step custom wizard with no single driving record is a better fit for a UI Page than for a standard form-based UI Policy or UI Action — and name one still-current, non-legacy reason a developer today would still need to build one.
