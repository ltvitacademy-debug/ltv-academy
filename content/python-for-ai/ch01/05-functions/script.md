# Script — Functions

## Segment 1 (title)

Functions are how you stop repeating yourself. This lesson covers defining them, giving them default values, and the calling style real AI SDKs expect.

## Segment 2 (code: defining a function)

def starts the definition, parentheses hold the parameters, and return sends a value back. greet_model takes a model name and returns a formatted message. A function with no return statement just returns None.

## Segment 3 (code: default values)

A parameter can have a default, making it optional. call_model takes a prompt, plus temperature and max_tokens that default to 0.7 and 500. Call it with just the prompt and both defaults apply; override just one by naming it.

## Segment 4 (code: keyword arguments)

You can pass arguments by name instead of position — prompt equals, temperature equals, max_tokens equals. This is exactly how real AI SDKs expect calls to look, and naming arguments makes a call self-documenting and order-independent.

## Segment 5 (code: args and kwargs)

Two things you'll see in library code before you write them yourself: star args collects any number of extra positional arguments, double-star kwargs collects any number of extra named ones. This is how libraries like requests accept a flexible, open-ended set of options.

## Segment 6 (outro)

Functions package logic; next lesson covers what happens when that logic fails — error handling with try and except, so one bad API call doesn't crash your whole program.
