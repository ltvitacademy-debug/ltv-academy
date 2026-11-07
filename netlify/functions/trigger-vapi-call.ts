import type { Config } from "@netlify/functions";

interface RelayRequestBody {
  assistantId?: string;
  phoneNumberId?: string;
  customerNumber?: string;
  customData?: {
    assistantId?: string;
    phoneNumberId?: string;
    customerNumber?: string;
  };
  [key: string]: unknown;
}

// Normalizes a US/Canada phone number to E.164 (e.g. "+16786272796").
// GHL's merge fields often send "(678) 627-2796" or "6786272796" without
// a country code, which Vapi's API rejects outright.
function toE164UsNumber(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith("+")) {
    return `+${trimmed.slice(1).replace(/\D/g, "")}`;
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  return `+${digits}`;
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  const sharedSecret = process.env.RELAY_SHARED_SECRET;
  if (sharedSecret && req.headers.get("x-relay-secret") !== sharedSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  const vapiApiKey = process.env.VAPI_API_KEY;
  if (!vapiApiKey) {
    console.error("trigger-vapi-call: VAPI_API_KEY is not configured");
    return new Response(JSON.stringify({ error: "Relay is not configured" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  let body: RelayRequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const assistantId = (body.assistantId ?? body.customData?.assistantId ?? "").trim();
  const phoneNumberId = (body.phoneNumberId ?? body.customData?.phoneNumberId ?? "").trim();
  const customerNumber = (body.customerNumber ?? body.customData?.customerNumber ?? "").trim();

  if (!assistantId || !phoneNumberId || !customerNumber) {
    console.error("trigger-vapi-call: missing fields, raw body was:", JSON.stringify(body));
    return new Response(
      JSON.stringify({
        error: "Missing required field(s): assistantId, phoneNumberId, customerNumber",
        receivedKeys: Object.keys(body),
      }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }

  try {
    const vapiResponse = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vapiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistantId,
        phoneNumberId,
        customer: { number: toE164UsNumber(customerNumber) },
      }),
    });

    const responseText = await vapiResponse.text();

    if (!vapiResponse.ok) {
      console.error("trigger-vapi-call: Vapi API error", vapiResponse.status, responseText);
      return new Response(
        JSON.stringify({ error: "Vapi API error", status: vapiResponse.status, details: responseText }),
        { status: 502, headers: { "content-type": "application/json" } },
      );
    }

    return new Response(responseText, {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("trigger-vapi-call: relay error:", error);
    return new Response(JSON.stringify({ error: "Failed to reach Vapi" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
};

export const config: Config = {
  path: "/api/trigger-vapi-call",
};
