# The Sample Application

Chapter 1 gave you the brief, the repo layout, and the project plan. Now it's time to actually open the code. This lesson walks through both services in the `northbridgeretail/storefront` monorepo — `product-catalog` and `checkout` — endpoint by endpoint, so you know exactly what you're containerizing in the next lesson and deploying for the rest of the course.

## What you'll learn

- `product-catalog`'s endpoints and how it reads product data out of Postgres
- `checkout`'s endpoints, and how it calls PaymentPro and the legacy inventory service before handing a completed order to the shipping carrier
- Why Northbridge Retail built these as two separate services instead of one monolith
- What already exists on a developer's laptop today, versus what this course adds starting in this chapter

## `product-catalog`: Node.js 20 + Express

`services/product-catalog/` is a small, read-heavy REST API. It only talks to Postgres — it has no outbound calls to anything else, which is exactly why its traffic is steady and predictable: people browsing the storefront don't spike load the way a flash sale does.

```js
// services/product-catalog/server.js
const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get("/healthz", (_req, res) => res.json({ status: "ok" }));

app.get("/products", async (_req, res) => {
  const { rows } = await pool.query(
    "SELECT id, name, price_cents, in_stock FROM products ORDER BY id LIMIT 50"
  );
  res.json(rows);
});

app.get("/products/:id", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT id, name, price_cents, in_stock FROM products WHERE id = $1",
    [req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ error: "not_found" });
  res.json(rows[0]);
});

app.listen(8080, () => console.log("product-catalog listening on 8080"));
```

Three routes, one dependency (Postgres), one port (`8080`). That simplicity is the point — it's the easiest service in the monorepo to reason about, and later it gets the smaller of the two Horizontal Pod Autoscaler ranges because its load barely moves.

## `checkout`: Python 3.12 + FastAPI

`services/checkout/` is where almost all of the real complexity lives. It owns the cart and order-submission flow, and for every order it has to talk to two other systems before it can tell the customer "you're done":

```python
# services/checkout/main.py
from fastapi import FastAPI, HTTPException
import httpx

app = FastAPI()

@app.get("/healthz")
def healthz():
    return {"status": "ok"}

@app.post("/cart")
async def add_to_cart(item: CartItem):
    # adds a line item to the customer's in-progress cart
    ...

@app.post("/checkout")
async def checkout(order: OrderRequest):
    async with httpx.AsyncClient() as client:
        # 1. confirm stock with the existing legacy inventory service
        stock = await client.get(f"{INVENTORY_URL}/stock/{order.product_id}")
        if stock.json()["available"] < order.quantity:
            raise HTTPException(status_code=409, detail="out_of_stock")

        # 2. charge the customer via PaymentPro (OAuth2 client-credentials)
        token = await get_paymentpro_token()
        payment = await client.post(
            f"{PAYMENTPRO_URL}/charges",
            headers={"Authorization": f"Bearer {token}"},
            json={"amount_cents": order.total_cents, "currency": "usd"},
        )
        payment.raise_for_status()

        # 3. hand the completed order to the shipping carrier
        await client.post(SHIPPING_WEBHOOK_URL, json={"order_id": order.id})

    return {"status": "confirmed", "order_id": order.id}
```

`POST /cart` just builds up the cart. `POST /checkout` is the real workflow: it checks stock against the **legacy inventory service** (already running somewhere else at Northbridge — not something this capstone builds, just an upstream dependency checkout depends on), charges the card through **PaymentPro** using an OAuth2 client-credentials token, and finally fires a webhook so the shipping carrier can pick up the order. Any one of those three calls being slow makes `checkout` slow — remember that; it's exactly what goes wrong in the incident drill later in the course.

## Why two separate services instead of one monolith

- **Different languages for different jobs.** `product-catalog` is a thin data-access layer — Node/Express is a fine, fast fit. `checkout` orchestrates multiple external calls and benefits from FastAPI's async support and Python's ecosystem for things like payment SDKs.
- **Different scaling needs.** `product-catalog` traffic is steady; `checkout` is spiky because of flash sales. Splitting them means `checkout` can scale aggressively (you'll give it an HPA with min 3 / max 15 replicas in Chapter 4) without over-provisioning `product-catalog`.
- **Smaller blast radius.** A bug or outage in checkout doesn't take down product browsing, and vice versa. Independent deploys mean independent failure domains.
- **Independent release cadence.** The two services get their own CI pipeline stages, their own container images, and their own Helm charts (`charts/product-catalog/`, `charts/checkout/`) — one team can ship a `checkout` fix without touching `product-catalog` at all.

## What exists today vs. what you're adding

Right now both services only run on a developer's laptop with `node server.js` or `uvicorn main:app`. There's no container image, no cloud infrastructure, no pipeline, and no monitoring. This chapter (Phase 1) gets both services containerized and running together locally with Docker Compose — the foundation everything else in the capstone builds on top of.

## Key terms

- **`product-catalog`** — Node.js 20 + Express, port 8080, reads product data from Postgres, steady traffic
- **`checkout`** — Python 3.12 + FastAPI, port 8080, handles cart/checkout, calls PaymentPro and the legacy inventory service, webhooks the shipping carrier
- **PaymentPro** — the external payment processor, authenticated via OAuth2 client-credentials
- **Legacy inventory service** — an existing upstream service checkout depends on; not built in this capstone
- **HPA (Horizontal Pod Autoscaler)** — why the two services are split: `checkout` needs a much wider autoscaling range than `product-catalog`
