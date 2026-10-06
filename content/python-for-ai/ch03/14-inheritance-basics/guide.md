# Inheritance, Basics

**Chapter 3 · Object-Oriented Python · Lesson 14 of 37**

AI SDKs lean heavily on inheritance: a base exception class with specific errors beneath it, a base client with specialized subclasses. This lesson covers the mechanics — building a new class on top of an existing one — using a tiny API-client example that mirrors that pattern.

## What you'll learn

- How a subclass inherits attributes and methods from a parent class
- How to override a parent method in a subclass
- `super()` — calling the parent's version of a method from the subclass
- How Python decides which method runs when a subclass overrides one
- `isinstance()` and `issubclass()`

## A base class and a subclass

A subclass is declared by putting the parent class's name in parentheses. It automatically gets every attribute and method the parent defines.

```python
class APIClient:
    def __init__(self, api_key):
        self.api_key = api_key

    def send(self, prompt):
        raise NotImplementedError

class EchoClient(APIClient):
    def send(self, prompt):
        return f"Echo: {prompt}"
```

`APIClient` defines `send` as a placeholder (raising `NotImplementedError` signals "subclasses must fill this in"). `EchoClient(APIClient)` inherits `__init__` automatically — it doesn't redefine it — and overrides `send` with a real implementation.

```python
client = EchoClient(api_key="demo-key")
print(client.api_key)        # demo-key  (inherited from APIClient)
print(client.send("hi"))     # Echo: hi  (EchoClient's own version)
```

`client.api_key` works even though `EchoClient` never mentions `api_key` — it inherited `__init__` unchanged from `APIClient`.

## Overriding and extending with `super()`

Sometimes a subclass wants to *add* to the parent's behavior rather than fully replace it. `super()` gives you a reference to the parent class so you can call its version of a method before (or after) adding your own logic.

```python
class LoggingClient(APIClient):
    def __init__(self, api_key, log_prefix):
        super().__init__(api_key)       # runs APIClient's __init__
        self.log_prefix = log_prefix

    def send(self, prompt):
        print(f"{self.log_prefix}: sending prompt")
        return f"response to: {prompt}"
```

`super().__init__(api_key)` runs `APIClient.__init__`, which sets `self.api_key`, so `LoggingClient` doesn't have to repeat that line. It then adds its own `log_prefix` attribute on top.

## Which method actually runs?

When a subclass defines a method with the same name as the parent, the subclass's version runs — this is called **overriding**. Python looks at the object's own class first, and only falls back to the parent if the subclass doesn't define that name itself.

```python
lc = LoggingClient(api_key="demo-key", log_prefix="[DEBUG]")
lc.send("What's 2+2?")
# [DEBUG]: sending prompt
# (returns "response to: What's 2+2?")
```

## Checking types: `isinstance` and `issubclass`

```python
print(isinstance(lc, LoggingClient))   # True
print(isinstance(lc, APIClient))       # True — LoggingClient IS an APIClient
print(issubclass(LoggingClient, APIClient))  # True
```

A `LoggingClient` instance passes `isinstance(..., APIClient)` too, because inheritance means "is a kind of." This is exactly how real AI SDKs structure their exception hierarchies — catching a base `APIError` also catches every more specific error beneath it.

## Recap

- A subclass written as `class Child(Parent):` inherits the parent's attributes and methods automatically.
- Redefining a method in the subclass **overrides** the parent's version.
- `super().__init__(...)` calls the parent's method — commonly used to reuse setup logic instead of duplicating it.
- `isinstance()` and `issubclass()` both respect the inheritance chain.
- Next lesson: dataclasses, a shortcut for classes that mostly just hold data.
