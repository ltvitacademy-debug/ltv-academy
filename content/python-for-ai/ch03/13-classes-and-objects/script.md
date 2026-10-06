# Lesson 13 — Classes & Objects · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every AI SDK you'll ever use hands you objects — a client, a message, a response.
To use them well, and to build your own wrappers around them, you need to
understand what a class and an object actually are. That's this lesson.

## S2 · STEPS: The pieces of a class

A class is a blueprint; an object is one real thing built from it. Four
pieces make that work. The class keyword declares the blueprint. Init sets
up a new object's starting state. Self refers to the specific object a
method is running on. And attributes are the data stored on that object.
We'll build all four right now with a tiny ChatMessage class.

## S3 · CODE: Defining the class

Here's a ChatMessage class with two attributes, role and content, set up
inside init. Self dot role equals role stores the value onto this
particular object. Calling to_dict on an instance returns a plain
dictionary — handy for turning an object back into the JSON shape an API
expects.

## S4 · CODE: Every instance has its own state

Build two ChatMessage objects and they're completely independent. msg1 is
a user message, msg2 is an assistant message, and printing their roles
shows each one remembers its own data. That's the entire value of instance
attributes — one blueprint, independent state per object.

## S5 · CODE: Class attributes are shared

Put an attribute directly under the class, outside init, and it's shared
across every instance instead — a class attribute. Here, default_model is
gpt-4 for every ChatMessage unless an instance overrides it. Use class
attributes for shared defaults, instance attributes for anything that
varies per object.

## S6 · OUTRO CARD

That's classes and objects: a blueprint, instances built from it, self
tying a method back to one specific instance. Next lesson, we build a
second class on top of this one using inheritance.
