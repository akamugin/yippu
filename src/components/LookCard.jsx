export default function LookCard({ look, onOpen }) {
  return (
    <div
      onClick={() => onOpen?.(look)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen?.(look);
      }}
      style={{
        border: "1px solid #eee",
        borderRadius: 18,
        padding: 22,
        cursor: "pointer",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{look.title}</div>

      <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>
        {look.gender.toUpperCase()}
      </div>

      {look.tags?.length ? (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {look.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 14,
                border: "1px solid #ddd",
                padding: "4px 8px",
                borderRadius: 999,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div style={{ marginTop: 12, fontSize: 14, opacity: 0.8 }}>
        Click to preview →
      </div>
    </div>
  );
}
