"use client";

import { useEffect, useState } from "react";

/**
 * True when the page is loaded with ?embed=1 in the URL — used to hide
 * site chrome (header, footer, dashboard bar) when the page is displayed
 * inside a third-party iframe (e.g. embedded on the Wix site).
 */
export function useEmbedMode(): boolean {
  const [isEmbed, setIsEmbed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsEmbed(params.get("embed") === "1");
  }, []);

  return isEmbed;
}
