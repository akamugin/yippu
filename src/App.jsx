import { useMemo, useState, useEffect } from "react";
import looks from "./data/looks.json";
import GenderFilter from "./components/GenderFilter";
import LookCard from "./components/LookCard";
import Modal from "./components/Modal";
import PinterestEmbed from "./components/PinterestEmbed";

export default function App() {
  const [gender, setGender] = useState("all");
  const [selectedLook, setSelectedLook] = useState(null);

  const filtered = useMemo(() => {
    if (gender === "all") return looks;
    return looks.filter((l) => l.gender === gender || l.gender === "all");
  }, [gender]);

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
        <h1 style={{ margin: 0, fontSize: 32 }}>yippu</h1>
        <p style={{ marginTop: 8, opacity: 0.7 }}>
          Curated outfit inspo (Pinterest preview).
        </p>

        <GenderFilter value={gender} onChange={setGender} />
      </header>

      <main
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 14,
        }}
      >
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
