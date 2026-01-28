"use client";

import { useEffect } from "react";

function loadPinterestScript() {
  // Avoid loading multiple times
  if (document.querySelector('script[data-pinterest="true"]')) return;

  const s = document.createElement("script");
  s.async = true;
  s.defer = true;
  s.src = "https://assets.pinterest.com/js/pinit.js";
  s.setAttribute("data-pinterest", "true");
  document.body.appendChild(s);
}

export default function PinterestEmbed({ url }) {
  useEffect(() => {
    loadPinterestScript();

    // Ask Pinterest script to re-scan the page for new embeds
    // (works if the script has loaded already)
    const t = setTimeout(() => {
      if (window.PinUtils?.build) window.PinUtils.build();
    }, 50);

    return () => clearTimeout(t);
  }, [url]);

  // Pinterest official embed format:
  // data-pin-do can be "embedPin" or "embedBoard"
  // We'll start with embedPin — if you paste board links, we can auto-detect.
  const isBoard = url.includes("/board/") || url.includes("/boards/");

  return (
    <div>
      <a
        data-pin-do={isBoard ? "embedBoard" : "embedPin"}
        href={url}
      >
        {url}
      </a>
    </div>
  );
}
