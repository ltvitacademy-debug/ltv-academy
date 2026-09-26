Notebooks are ideal for exploring. But once your cleaning logic works, leaving it buried in cell forty-seven has real costs. You can't test it, you can't schedule it, and two people can't easily edit it together. Refactoring means moving the reusable parts into plain Python files, and keeping the notebook for exploring and presenting.

The rule of thumb is simple. Anything you'd want to run twice, or test, moves out. Loading, cleaning, and feature-building go into functions. Charts and commentary stay in the notebook. The path has four steps. Get the notebook working top to bottom. Turn important cells into functions. Move those functions into a dot py module. Then add a script that wires them together.

Here's the module. Each small function does one job and returns a new DataFrame. Standardize region trims and title-cases the text. Add revenue multiplies quantity by unit price. A single function, clean orders, chains them together with dot pipe, and drops duplicate order IDs on the way.

Now the script. It has a main function, and it uses argparse, so file paths come in as command-line flags instead of being hard-coded. It reads the raw file, calls clean orders, and writes the result. The last two lines are the famous name equals main guard. They mean, only run main when this file is executed directly, not when something imports it.

Running it on our five-row sample prints that it read five rows and wrote four, because one order was a duplicate. Use pathlib for paths and it works the same on Windows, macOS, and Linux.

Back in the notebook, a single import line replaces dozens of cells. The notebook stays short, readable, and focused on the story of the analysis, while the logic lives somewhere it can be reused and tested.

Speaking of testing, that's exactly where we go next.
