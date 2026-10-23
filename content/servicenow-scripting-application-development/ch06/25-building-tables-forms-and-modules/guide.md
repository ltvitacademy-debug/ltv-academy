# Lesson 25 — Building Tables, Forms & Modules

**Chapter 6 · Tables, Forms & Modules for a Custom Application · Lesson 25 of 37**

## What you'll learn

- The real Studio workflow for creating a table from scratch and choosing what it extends
- How to configure a brand-new table's Form Layout and List Layout, applying Course 2's rules to a table you designed yourself
- The real, specific record type that makes a table actually reachable from the Application Navigator
- Why a table can exist perfectly and still be functionally invisible to every user on the instance

## Creating the table in Studio

Lesson 24 settled the design: Room Booking extends `task`, and Room stands alone. Building either
one starts the same way — inside Studio, open **Create Application File**, choose **Table**, and
fill in two fields that matter most. **Label** is the human-readable name shown throughout the UI
("Room Booking"). **Name** is the real database table name, and Studio automatically prefixes it
with your application's scope — `x_acme_room_booking` — exactly the scoped naming convention
Chapter 5 covered. The field that makes or breaks the design from Lesson 24 is **Extends**: set it
to `task` for Room Booking, inheriting `state`, `assignment_group`, and priority immediately, and
leave it blank for Room, creating a clean standalone table with none of that baggage. This single
field is the entire implementation of the extend-or-stand-alone decision — there's no other switch
to flip.

## Adding the fields — including the reference field

With the table created, Studio drops you into its dictionary, the same `sys_dictionary` records
Course 2 taught you to read. Add each field your design called for: on Room, straightforward
fields like `building` and `capacity`. On Room Booking, the planned `room` field gets created with
**Type** set to **Reference** and **Reference** set to the Room table — the exact mechanism that
makes a reference field display a readable value while storing a `sys_id` underneath, the same
pattern from Lesson 24, now actually built. Each field you add here is a real, permanent schema
change the moment you save it; this is why Lesson 24's planning step matters — fixing a wrong
field type after real records exist is far more disruptive than getting it right once, here.

## Configuring Form Layout and List Layout

With fields in place, two more configuration steps make the table usable, both exactly as Course
2's Forms & Lists chapter described, now applied to a table of your own. **Form Layout** moves
fields from the "available" column onto the actual form and lets you group them into sections —
for Room Booking, a section for the request itself (`room`, `short_description`, requested date)
and a separate section for approval fields. **List Layout** chooses which columns show up when
someone views Room Booking as a list — typically `short_description`, `room`, `state`, and
`assignment_group`, so an approver scanning the list sees the fields that matter without opening
every record.

## The real gap: a table nobody can reach

Here's the part that surprises new developers. At this point, Room Booking and Room are real,
complete tables — dictionary entries, form, list, all correctly built — and neither one shows up
anywhere in the Application Navigator. The navigator doesn't display tables directly; it displays
**modules**, and a table with zero modules pointing at it has no entry in the tree at all. The
only way in, right now, is typing the table name directly into the navigator filter — Course 2's
direct-navigation shortcut (`x_acme_room_booking.list`) — which works for any table but isn't
something you can expect a real end user to know or do. Closing that gap means creating an actual
**Module** record, in `sys_app_module`: in Studio, **Create Application File > Module**, give it a
label ("Room Bookings"), set its **Link type** to **List of Records**, and point it at the Room
Booking table. The instant that record is saved, "Room Bookings" appears as a clickable entry in
your application's section of the navigator — the table hasn't changed at all, but it's gone from
invisible to one click away.

## Key terms

| Term | Meaning |
|---|---|
| Create Application File | Studio's entry point for creating a new Table, Module, or other application file |
| Extends | The table field that implements Lesson 24's decision — `task`, or left blank for a standalone table |
| Form Layout / List Layout | The configuration steps that place fields onto a table's form and choose its list columns |
| Module (`sys_app_module`) | The specific record type that makes a table reachable as a clickable item in the Application Navigator |

## Check yourself

Without looking back: after building the Room Booking table completely — dictionary, form, list —
why would it still be invisible in the Application Navigator, and what one record type fixes that?
