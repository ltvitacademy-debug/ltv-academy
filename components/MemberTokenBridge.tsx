"use client";

import { useEffect } from "react";

// Receives the signed membership token Wix mints for logged-in members and
// passes into this embedded app's URL as ?k=, and turns it into a cookie so
// client-side navigation between lessons (which never re-requests the
// iframe's src, so the token would otherwise only ever be checked once)
// keeps the member-gate.ts edge function satisfied on every page under
// /app/*. Also accepts a fresh token pushed later via postMessage, so a long
// study session doesn't need the whole iframe to reload — see the Velo page
// code on every Wix page that embeds this app for the other half.
const COOKIE_NAME = "ltv_k";
const COOKIE_MAX_AGE_SECONDS = 6 * 60 * 60; // keep in sync with member-gate.ts TOKEN_TTL_MS

export default function MemberTokenBridge() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("k");
    if (token) {
      setTokenCookie(token);
      url.searchParams.delete("k");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }

    function onMessage(event: MessageEvent) {
      const data = event.data;
      if (!data || data.type !== "ltv-member-token") return;
      if (typeof data.token === "string" && data.token) {
        setTokenCookie(data.token);
      } else {
        clearTokenCookie();
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}

function setTokenCookie(token: string) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=None; Secure`;
}

function clearTokenCookie() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=None; Secure`;
}
