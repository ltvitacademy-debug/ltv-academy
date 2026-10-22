# Lesson 25 — System Properties

**Chapter 6 · System Properties, Scheduled Jobs & Logs · Lesson 25 of 36**

## What you'll learn

- What a system property actually is, and where every one of them lives
- How to find a property through its dedicated settings page vs. the raw `sys_properties` table
- Three real, commonly-referenced out-of-box properties and what each one controls
- How a script reads a property at runtime with `gs.getProperty()`
- Why changing a property is a configuration change, not a code change — and why that still deserves caution

## Every property is a record in `sys_properties`

A system property is a single name/value pair stored as a record in the `sys_properties` table. Underneath every "Properties" page you've ever opened in ServiceNow — Incident Management Properties, Service Catalog Properties, Notification Properties — you're really looking at a filtered, formatted view over rows in that one table. The UI page groups related properties and gives each one a friendly label and description; the table itself just stores `name`, `value`, `description`, and a few flags like whether the value is a plain string, true/false, integer, or comma-separated list.

Knowing this matters because not every property has a dedicated page. Plenty of useful properties exist only as raw rows in `sys_properties`, discoverable by navigating to the table directly (type `sys_properties.list` in the navigator, or go to System Properties > System Properties if your instance exposes that "all properties" view) and filtering by name.

## Two ways to reach the same setting

The friendly path: open an application's own Properties page — for example System Policy > Incident Management Properties — where ServiceNow has already laid out the relevant properties with labels, help text, and the right input control (a checkbox for a boolean, a dropdown for a choice list). This is the intended path for anything an admin is expected to tune regularly.

The raw path: open the `sys_properties` table list view directly and search by name. This is how you reach a property that has real effect but no dedicated page — which is common, because ServiceNow ships hundreds of properties and only builds dedicated UI for a fraction of them. Both paths edit the exact same record; there's no difference in effect, only in how comfortable the editing experience is.

## Three properties worth knowing by name

`glide.ui.incident_default_state` controls what state a new Incident record opens in by default — change it and every newly created incident starts there instead. `glide.sys.default_tz` sets the instance's default time zone, which affects how date/time fields display for any user who hasn't set a personal time zone preference. And across nearly every application, you'll find feature-toggle-style properties — booleans that simply turn a behavior on or off, like enabling a specific validation or a UI element, without touching any code. These three patterns — a default value, a global setting, and a feature toggle — cover the large majority of properties you'll encounter as an admin.

## How a script reads a property

You won't write the script yourself until the scripting course later in this path, but it's worth knowing the mechanism now because you'll see it constantly in Business Rules, Script Includes, and other server-side code you'll be asked to read or troubleshoot: `gs.getProperty('property.name')` is the real API a script uses to pull a property's current value at runtime. This is exactly why system properties exist as a concept distinct from hardcoded values — a developer writes `gs.getProperty('glide.ui.incident_default_state')` once, and an admin can change that behavior later by editing a property record, with no code deployment required.

## Why "just configuration" still deserves care

Because editing a property requires no scripting and no Update Set discipline beyond the property record itself, it's tempting to treat properties as low-risk. Many are. But a property like the default time zone or a validation toggle can affect every user or every record on the instance the moment you save it — there's no staging step, no approval gate baked in. Treat a property change with the same "what else reads this?" caution you'd apply to any configuration change, especially on a production instance.

## Key terms

| Term | Meaning |
|---|---|
| System property | A name/value configuration record stored in the `sys_properties` table |
| `sys_properties` | The table that holds every system property, with or without a dedicated UI page |
| Properties page | An application-specific UI page that groups related properties with friendly labels |
| `gs.getProperty('name')` | The server-side script API that reads a property's current value |
| Feature toggle | A boolean-style property that turns a specific behavior on or off |

## Check yourself

A colleague tells you they need to change a setting that has no dedicated Properties page anywhere in the application navigator. Where do you go, and what are you actually editing when you get there?
