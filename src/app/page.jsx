"use client";

import { useMemo, useState, useEffect } from "react";
import { Cormorant_Garamond, Noto_Serif_KR, Noto_Serif_SC } from "next/font/google";
import GenderFilter from "../components/GenderFilter";
import LookCard from "../components/LookCard";
import Modal from "../components/Modal";
import PinterestEmbed from "../components/PinterestEmbed";

const subtitleFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const subtitleKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const subtitleSc = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Page() {
  const [gender, setGender] = useState("all");
  const [selectedLook, setSelectedLook] = useState(null);
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/looks")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setLooks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setLooks([]);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (gender === "all") return looks;
    return looks.filter((l) => l.gender === gender || l.gender === "all");
  }, [gender, looks]);

  // Close modal on Escape
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setSelectedLook(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <header style={{ marginBottom: 20 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 52,
            letterSpacing: 0.2,
            fontWeight: 600,
          }}
        >
          Yippu
        </h1>
        <p
          className={subtitleFont.className}
          style={{ marginTop: 10, opacity: 0.7, fontSize: 28 }}
        >
          <span className={subtitleSc.className}>衣服</span>(yī fu), but make it{" "}
          <span className={subtitleKr.className}>이뻐</span>(yippeo).
        </p>

        <GenderFilter value={gender} onChange={setGender} />
      </header>

      <main
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 18,
        }}
      >
        {loading ? (
          <div style={{ opacity: 0.7 }}>Loading looks…</div>
        ) : null}
        {!loading && filtered.length === 0 ? (
          <div style={{ opacity: 0.7 }}>No looks found.</div>
        ) : null}
        {filtered.map((look) => (
          <LookCard key={look.id} look={look} onOpen={setSelectedLook} />
        ))}
      </main>

      <Modal
        open={!!selectedLook}
        onClose={() => setSelectedLook(null)}
        title={selectedLook?.title ?? ""}
      >
        {selectedLook ? (
          <>
            <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
              <a
                href={selectedLook.pinterestUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  padding: "8px 10px",
                  textDecoration: "none",
                  color: "#111",
                  display: "inline-block",
                }}
              >
                Open on Pinterest ↗
              </a>
            </div>

            <PinterestEmbed url={selectedLook.pinterestUrl} />
          </>
        ) : null}
      </Modal>
    </div>
  );
}
