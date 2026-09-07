# Lesson 3 — Connecting Power BI to Python

**Chapter 1 · Getting Started · Lesson 3 of 20**

## What you'll learn

- Exactly where Power BI Desktop's Python settings live
- What "detected Python home directories" actually means
- Why Power BI also wants to know about your Python IDE
- What the warning looks like when this step gets skipped

## Finding the Python scripting settings

In Power BI Desktop: **File → Options and settings → Options → Python
scripting**. This one screen is the entire connection between Power BI and
the Python you installed in Lesson 2.

![Screenshot of the Python script options page in Power BI Desktop, showing Detected Python home directories and Detected Python IDEs.](/courses/python-for-power-bi/ch01/03-connecting-python/python-scripts-7.png)
*Everything Lesson 2 installed gets pointed to right here — one screen, two dropdowns.*

## Detected Python home directories

If Lesson 2's installation went correctly — Python installed from
python.org with **Add python.exe to PATH** checked — Power BI usually
detects it automatically and lists it in this dropdown. If you have more
than one Python installation on your machine, make sure you select the one
where you actually ran `pip install pandas` and `pip install matplotlib`;
Power BI runs scripts using whichever installation is selected here,
nothing else.

If nothing appears in the dropdown at all, select **Other** and browse
directly to your Python installation folder — this is usually a sign the
PATH checkbox from Lesson 2 was missed, and it's worth revisiting that
step rather than only fixing it here.

## Detected Python IDEs

The same screen also lists **Detected Python IDEs** — this is optional and
separate from getting scripts to run. It only controls which editor opens
when you choose to edit a Python script outside Power BI directly; it has
no effect on whether your scripts actually execute inside Power BI.

## What happens if this step gets skipped

If Python isn't installed, or Power BI can't find a valid installation,
you'll see a clear warning the moment you try to use Python inside Power
BI:

![Screenshot of a warning message that Python isn't installed.](/courses/python-for-power-bi/ch01/03-connecting-python/python-scripts-3.png)
*This exact message is your signal to come back to this screen and fix the home directory setting.*

## Confirming the connection

Select **OK** to save. There's no separate "test connection" button — the
real test is Lesson 4 onward, when you actually try running a Python
script from inside Power BI for the first time.

## Key terms

| Term | Meaning |
|---|---|
| Python script options | The Power BI Desktop settings screen (File → Options) connecting Python |
| Detected Python home directories | The dropdown selecting which installed Python Power BI actually runs |
| Detected Python IDEs | An optional, separate setting for external script editing only |

## Lab

1. Open Power BI Desktop and navigate to **File → Options and settings →
   Options → Python scripting**.
2. Confirm your Lesson 2 Python installation appears in **Detected Python
   home directories**. If it doesn't, select **Other** and browse to it
   directly.
3. Select **OK** to save the setting — you're now ready for Lesson 4,
   where actual Python code enters the picture.

## Check yourself

You're ready for Lesson 4 when you can find the Python scripting settings
screen from memory, and explain what it means if your Python installation
never shows up in the "Detected" dropdown at all.
