# Script — Error Handling: try/except

## Segment 1 (title)

Code fails. Networks time out, files go missing, APIs return garbage. This lesson is about handling that without your whole program crashing.

## Segment 2 (code: unhandled errors crash everything)

Without handling, any error crashes the entire program — ten divided by zero raises a ZeroDivisionError, and nothing after that line ever runs. For AI engineering specifically, a single failed API call should never be allowed to take down a whole application.

## Segment 3 (code: try and except)

Wrap risky code in try; if it raises an exception, except catches it and the program keeps running. Catch the error, handle it sensibly, and move on — that's the whole pattern.

## Segment 4 (code: catch specific exceptions)

It's tempting to catch everything with a bare except, but that hides real bugs along with expected failures. Catch the specific type you expect — KeyError when a dictionary's missing a key, ValueError for bad JSON, ConnectionError when a network call fails.

## Segment 5 (code: finally and raise)

finally runs whether or not an exception happened — useful for cleanup. And raise lets you signal your own error conditions, stopping execution with a clear message instead of a confusing failure somewhere else later.

## Segment 6 (outro)

Handling failure gracefully is half of writing reliable code. Next lesson: working with modules — Python's system for organizing and reusing code across files, including the ones you'll import from every AI library.
