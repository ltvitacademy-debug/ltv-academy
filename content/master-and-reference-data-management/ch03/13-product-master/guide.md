# Lesson 13 — Product Master

**Chapter 3 · Master Data Domains · Lesson 13 of 25**

## What you'll learn

- What belongs in a product master record beyond a name and price
- Why products need a classification hierarchy, not just a flat list
- The difference between a product and a SKU (stock-keeping unit)
- Where product master data gets consumed, and why inconsistency there is expensive

## What a product master record holds

A **product master** is the authoritative record of everything an organization sells or stocks. Beyond the obvious — name and description — a usable product record carries a unique product identifier, unit of measure, dimensions and weight, a global trade identifier (like a GTIN or UPC) where applicable, lifecycle status (active, discontinued, seasonal), and the classification that places it in a category structure.

As with customer master, none of this changes transaction by transaction. The product record for a specific item is the same whether it sells one unit or ten thousand this quarter — which is exactly why it's master data and not something recomputed from order history.

## Product vs. SKU: two different levels of "the same thing"

A **product** is the conceptual item — "Men's Crew Socks, Size M." A **SKU (stock-keeping unit)** is a specific sellable variant of that product — one color, one pack size, one unit of measure — each with its own barcode and inventory count. "Men's Crew Socks, Size M, Black, 3-Pack" is a SKU; the product it belongs to might have a dozen SKUs across colors and pack sizes.

Getting this distinction wrong in a data model causes real damage: roll up sales by SKU and you can't see that a product overall is trending; roll everything up to the product level only and a warehouse can't tell which specific barcode to pick off the shelf. A good product master keeps both levels and the relationship between them.

## The classification hierarchy

Products are almost never managed as a flat list — they sit in a **hierarchy**: brand, then category, then subcategory, then the individual product and its SKUs. "Nike" (brand) → "Footwear" (category) → "Running Shoes" (subcategory) → a specific shoe model → its size/color SKUs.

This hierarchy does real work beyond organization. It drives e-commerce navigation (the category tree a shopper clicks through), reporting roll-ups (sales by category, not just by individual SKU), and even tax and regulatory rules that apply at a category level (certain product categories are taxed or restricted differently). Reorganizing the hierarchy — moving a product to a new category, splitting a category in two — is a governed change for the same reason reorganizing a customer hierarchy is (Lesson 12): downstream reports and rules depend on where things sit.

## Where inconsistent product data actually bites

Product master inconsistency shows up most visibly in e-commerce and omnichannel retail: the same product listed with different descriptions on the website versus the in-store catalog versus a marketplace feed (Amazon, a distributor's portal) confuses customers and can trigger marketplace compliance penalties. In manufacturing and distribution, a mismatched unit of measure between the product master and a warehouse system can turn an order for 10 cases into an order for 10 individual units — an expensive, entirely preventable error that traces straight back to master data quality (Lesson 22 covers this class of problem generally).

## Key terms

| Term | Meaning |
|---|---|
| SKU (stock-keeping unit) | A specific sellable variant of a product — one color, size, or pack — tracked separately in inventory |
| GTIN / UPC | A standardized global identifier for a trade item, used for barcode scanning and marketplace listings |
| Product hierarchy | The brand → category → subcategory → product → SKU classification structure |
| Unit of measure (UOM) | The quantity unit a product is bought, sold, or stocked in (each, case, pallet, kilogram) |

## Lab

Pick any physical product you own that comes in multiple variants (a shirt in several sizes, a snack in several flavors). Identify what you believe is the "product" level versus the "SKU" level for that item, and list three attributes that would be the same across every SKU versus three that would differ SKU by SKU.

## Check yourself

Explain the difference between a product and a SKU using your own example, and describe one real business decision that depends on keeping both levels distinct in the data model.
