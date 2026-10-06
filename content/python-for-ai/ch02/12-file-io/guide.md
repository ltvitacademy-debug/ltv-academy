# Lesson 12 — File I/O

**Chapter 2 · Data Structures for AI Work · Lesson 12 of 37**

## What you'll learn

- Reading and writing text files with `open()`
- Why `with` is the standard, safe way to open a file
- Reading and writing JSON files directly with the `json` module
- A realistic pattern: saving API responses to disk for later

## Opening a file: the `with` pattern

`open()` gives you a file object; `with` guarantees the file gets closed automatically, even if an error happens partway through:

```python
with open("notes.txt", "r") as file:
    contents = file.read()
    print(contents)
# File is automatically closed here, even if read() had failed
```

`"r"` means read mode. Without `with`, you'd need to call `file.close()` yourself — easy to forget, and a forgotten close can leak resources or lose unsaved data.

## Writing to a file

```python
with open("notes.txt", "w") as file:
    file.write("First line\n")
    file.write("Second line\n")
```

`"w"` means write mode, and it **overwrites** the file's entire previous contents. Use `"a"` (append mode) instead to add to the end without erasing what's already there:

```python
with open("log.txt", "a") as file:
    file.write("New log entry\n")
```

## Reading line by line

```python
with open("notes.txt", "r") as file:
    for line in file:
        print(line.strip())   # .strip() removes the trailing newline
```

## JSON files: the pattern you'll use constantly

Most real data you save and load in AI projects is JSON — configs, cached responses, structured results. The `json` module reads and writes files directly, no manual string handling needed:

```python
import json

# Writing a dict to a JSON file:
data = {"model": "gpt-4o", "temperature": 0.7}
with open("config.json", "w") as file:
    json.dump(data, file)

# Reading it back:
with open("config.json", "r") as file:
    loaded_data = json.load(file)

print(loaded_data["model"])   # "gpt-4o"
```

Note the naming: `json.dump()` / `json.load()` work directly with an open file; `json.dumps()` / `json.loads()` (Lessons 9 and 11) work with a string already in memory. The extra `s` means "string."

## A realistic pattern: saving API responses

```python
import json

def save_response(response_data, filename):
    with open(filename, "w") as file:
        json.dump(response_data, file, indent=2)   # indent=2: readable formatting

save_response({"model": "gpt-4o", "content": "Hello!"}, "last_response.json")
```

## Key terms

| Term | Meaning |
|---|---|
| `with open(...) as file:` | Opens a file and guarantees it closes automatically |
| `"r"` / `"w"` / `"a"` | Read / write (overwrite) / append mode |
| `json.dump()` / `json.load()` | Write/read JSON directly to/from an open file |
| `json.dumps()` / `json.loads()` | Write/read JSON to/from a string already in memory |

## Check yourself

Chapter 2 is complete. Before moving on, be able to explain the difference between `json.dump()` and `json.dumps()`, and write a `with` block that writes a dictionary to a JSON file.
