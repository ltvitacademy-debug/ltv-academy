"use client";

import { useEffect } from "react";

// Receives TWO signed tokens Wix mints for logged-in members and turns each
// into its own cookie:
//   - ?k= / "ltv-member-token" -> ltv_k: proves "a logged-in member is
//     viewing /app/*" (netlify/edge-functions/member-gate.ts). No identity
//     payload — this is the original Phase A mechanism, unchanged.
//   - ?wm= / "ltv-member-identity" -> ltv_wm: a REAL signed identity
//     (memberId + email), minted by a Velo backend snippet calling
//     currentMember.getMember() server-side, verified by
//     lib/wixMemberToken.ts. This is what the Professional Mock Interview's
//     Netlify Functions use for real auth (Phase D) instead of a bare,
//     client-asserted email — see the Phase D report for the exact Velo
//     snippet that mints it and where ?wm= is only relevant (pages under
//     /app/mock-interview/*, not every /app/* page).
// Both survive client-side navigation (which never re-requests the iframe's
// src, so a URL param would otherwise only ever be read once) and both
// accept a fresh value pushed later via postMessage, so a long session
// doesn't need the whole iframe to reload.
const TOKEN_COOKIE_NAME = "ltv_k";
const IDENTITY_COOKIE_NAME = "ltv_wm";
const COOKIE_MAX_AGE_SECONDS = 6 * 60 * 60; // keep in sync with member-gate.ts / lib/wixMemberToken.ts's TOKEN_TTL_MS

export default function MemberTokenBridge() {
  useEffect(() => {
    const url = new URL(window.location.href);
    let urlChanged = false;

    const token = url.searchParams.get("k");
    if (token) {
      setCookie(TOKEN_COOKIE_NAME, token);
      url.searchParams.delete("k");
      urlChanged = true;
    }

    const identityToken = url.searchParams.get("wm");
    if (identityToken) {
      setCookie(IDENTITY_COOKIE_NAME, identityToken);
      url.searchParams.delete("wm");
      urlChanged = true;
    }

    if (urlChanged) {
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }

    function onMessage(event: MessageEvent) {
      const data = event.data;
      if (!data || typeof data.type !== "string") return;
      if (data.type === "ltv-member-token") {
        if (typeof data.token === "string" && data.token) setCookie(TOKEN_COOKIE_NAME, data.token);
        else clearCookie(TOKEN_COOKIE_NAME);
      } else if (data.type === "ltv-member-identity") {
        if (typeof data.token === "string" && data.token) setCookie(IDENTITY_COOKIE_NAME, data.token);
        else clearCookie(IDENTITY_COOKIE_NAME);
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=None; Secure`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=None; Secure`;
}
