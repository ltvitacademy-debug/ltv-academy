# Classes & Objects

**Chapter 3 · Object-Oriented Python · Lesson 13 of 37**

Every library you'll use to talk to an AI model — OpenAI's SDK, Anthropic's SDK, LangChain — hands you an object: a `client`, a `message`, a `response`. To use them well (and to build your own wrappers around them), you need to understand what a class and an object actually are. This lesson builds that from scratch.

## What you'll learn

- The difference between a **class** (a blueprint) and an **object** (an instance built from it)
- How `__init__` sets up a new object's starting state
- What `self` actually refers to
- Instance attributes vs. class attributes
- Calling methods on an object

## Classes are blueprints, objects are the real thing

A **class** defines what a kind of thing looks like and what it can do. An **object** (or **instance**) is one actual thing built from that blueprint. `int` and `str` are classes you've used since Lesson 3 without calling them that — `5` and `"hello"` are objects (instances) of those classes.

```python
class ChatMessage:
    def __init__(self, role, content):
        self.role = role
        self.content = content

    def to_dict(self):
        return {"role": self.role, "content": self.content}
```

`class ChatMessage:` declares the blueprint. `__init__` is a special method Python calls automatically every time you build a new `ChatMessage` — it's where you set up the object's starting attributes.

## `self` is just "this particular object"

`self` is the first parameter of every instance method, and Python fills it in for you automatically — you never pass it explicitly. It's simply a reference to the specific object the method is being called on, which is how `self.role = role` ends up storing data *on that object* rather than somewhere global.

```python
msg = ChatMessage("user", "Hello!")
print(msg.to_dict())
# {'role': 'user', 'content': 'Hello!'}
```

`ChatMessage("user", "Hello!")` calls `__init__` behind the scenes with `self` bound to the new, empty object, `role="user"`, and `content="Hello!"`. The result is a fully built `ChatMessage` object, stored in `msg`.

## Every instance has its own state

Create a second `ChatMessage` and it is a completely separate object — changing one never touches the other.

```python
msg1 = ChatMessage("user", "What's the weather?")
msg2 = ChatMessage("assistant", "It's sunny.")
print(msg1.role, msg2.role)
# user assistant
```

This is the whole point of instance attributes: each object remembers its own `role` and `content` independently, the same way two rows in a database table share a schema but hold different data.

## Class attributes: shared across every instance

An attribute defined directly under the class, outside `__init__`, is a **class attribute** — shared by every instance unless an instance overrides it.

```python
class ChatMessage:
    default_model = "gpt-4"   # class attribute, shared

    def __init__(self, role, content):
        self.role = role         # instance attribute
        self.content = content

m = ChatMessage("user", "hi")
print(m.default_model)
# gpt-4
```

Use class attributes for values every instance should share by default (a default model name, a default timeout); use instance attributes (set in `__init__` via `self`) for anything that varies per object.

## Recap

- A class is a blueprint; an object is one instance built from it.
- `__init__` runs automatically when you create an object, setting up its starting attributes.
- `self` refers to the specific instance a method was called on — Python supplies it automatically.
- Instance attributes (set with `self.x = ...`) are independent per object; class attributes are shared.
- Next lesson: inheritance — building a new class on top of an existing one.
