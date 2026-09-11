# Lesson 20 — Text Box Formatting

**Chapter 4 · Expressions & Formatting · Lesson 20 of 40**

## What you'll learn

- The **Home** ribbon's Font and Paragraph groups — bold, underline,
  color, alignment — applied directly, no expression required
- Where border and background color actually live: the **Border**
  and **Fill** tabs of a text box's **Properties** dialog
- **WritingMode**, the property that rotates text 90 or 270 degrees
  inside a cell
- How a hyperlink gets attached to text through the **Action** tab

## Not every formatting decision needs an expression

Lesson 19 was all about expressions driving style properties
dynamically. Plenty of formatting, though, is just a fixed choice you
set once: bold a header row, underline a link, put a border around a
box. Report Builder's **Home** tab has a **Font** group (bold, italic,
underline, font, size, color) and a **Paragraph** group (alignment)
that apply directly to whatever text box or cell is selected — same
idea as a word processor.

## Border and background: the Properties dialog, not the ribbon

Borders and background fills aren't on the ribbon — they live in the
text box's own **Properties** dialog. Right-click a text box and
select **Text Box Properties**: the **Border** tab sets style, width,
and color for any edge; the **Fill** tab sets a solid background
color (or an image). The same Border/Fill tab pattern applies to
rectangles and images — right-click, choose *that* item's Properties,
and the same two tabs are there.

## A real report, formatted three different ways

![A Report Builder report showing currency-formatted sales, blue underlined hyperlinked text, and a rotated "Territory" column header.](/courses/ssrs/ch04/20-text-box-formatting/formatted-report-currency-hyperlink-rotated.png)
*Currency, a hyperlink, and rotated text — all text box properties.*

This one finished report demonstrates three separate text box
techniques at once:

- **Currency formatting** on the `Sales` column — set from the
  **Home** tab's **Number** group (covered in full in Lesson 21).
- **A hyperlink** on `Link Text` — set via the text box's **Action**
  tab (**Go to URL**), then styled underlined and blue through the
  ordinary **Font** group so it *looks* like a link.
- **Rotated text** on the `Territory` column header — set via the
  **WritingMode** property in the Properties pane, changed from
  `Default` to `Rotate270`, so the label reads bottom-to-top.

## Key terms

| Term | Meaning |
|---|---|
| Text Box Properties | The dialog (right-click a text box) holding its Border, Fill, and Action tabs |
| Border tab | Sets style, width, and color for any edge of the selected item |
| Fill tab | Sets a solid background color (or background image) |
| Action tab | Attaches an action to a text box, e.g. **Go to URL** for a hyperlink |
| WritingMode | The property that rotates text 90° or 270° inside its box |

## Lab

1. Select any text box and, on the **Home** tab, apply **Bold** and
   **Underline**, then change its **Color**.
2. Right-click the same text box, open **Text Box Properties**, and
   set a **Border** style and a **Fill** color.
3. Find its **WritingMode** property in the Properties pane and try
   `Rotate270` to see the text run vertically.

## Check yourself

You're ready for Lesson 21 when you can explain, without looking:
where do you set a text box's border and background color, and how is
that different from the Home ribbon's Font group?
