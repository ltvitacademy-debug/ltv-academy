# Lesson 11 — Import vs. DirectQuery · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Every connector in this chapter has quietly asked you the same question,
and every time, we picked the same answer without explaining why. Let's fix
that.

## S2 · IMAGE: signin.png (Server/Database dialog with Import/DirectQuery)

Here it is again, from Lesson 9. Import copies your data into the Power BI
file — fast, and everything in this course works with it. DirectQuery
leaves the data where it lives and queries it live, every single time a
visual loads. Different data, different tradeoffs.

## S3 · IMAGE: see-storage-mode.png (Model view, Storage mode property)

That choice isn't locked in forever, either. Switch to Model view, select a
table, expand Advanced in Properties, and there's Storage mode — Import,
DirectQuery, and a third option, Dual, that we're about to explain. One
asymmetry worth remembering: you can convert DirectQuery to Import, but
never the other way. Start with DirectQuery if you're unsure.

## S4 · IMAGE: table-view-table-data.png (Table view showing cached data)

Here's a visible consequence. Table view — from Lesson 3 — shows you cached
data like this for Import and Dual tables. DirectQuery tables show nothing
here, because there's nothing stored locally to show. That's not a bug,
that's the whole point of DirectQuery.

## S5 · IMAGE: model-view-table-relationships.png (five related tables)

Real reports often mix a huge, constantly-changing fact table, like Sales,
with small tables that barely ever change, like Date or Customer. That
mismatch is exactly where Dual mode earns its keep.

## S6 · IMAGE: limited-relationship-warning.png (storage mode warning dialog)

Convert one DirectQuery table to Import, and Power BI warns you, then
offers to set the related dimension tables to Dual. Dual tables act as
Import when that's faster, and as DirectQuery when they need to stay
consistent with a table that's still live. You won't need this for a
while — just know it exists.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Import for speed and full features, DirectQuery for scale and real-time
data, Dual for the best of both when you need it. That closes out Chapter
Two — every way to get data into Power BI. Chapter Three starts cleaning
it up: Power Query, from the very beginning. See you there.
