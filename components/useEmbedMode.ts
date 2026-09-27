"use client";

import { useEffect, useState } from "react";

/**
 * True when this page should hide site chrome (header, footer) because
 * it's being viewed inside a third-party iframe — e.g. embedded on the
 * Wix site. Detected two ways, either is enough:
 *
 * 1. Automatically: `window.self !== window.top` is true whenever this
 *    page is rendered inside ANY iframe, on any site, with no cooperation
 *    needed from whoever set up the embed. This is the primary check —
 *    it works even if the embedding page's iframe `src` was pasted in
 *    without any extra query string, which is what actually happened with
 *    the Wix embed the first time around.
 * 2. Manually: `?embed=1` in the URL, kept as an explicit override for
 *    testing embed mode in a normal top-level browser tab (where check 1
 *    is never true), or for an embed technique that doesn't use an
 *    <iframe> at all.
 */
export function useEmbedMode(): boolean {
  const [isEmbed, setIsEmbed] = useState(false);

  useEffect(() => {
    const inIframe = window.self !== window.top;
    const params = new URLSearchParams(window.location.search);
    setIsEmbed(inIframe || params.get("embed") === "1");
  }, []);

  return isEmbed;
}
