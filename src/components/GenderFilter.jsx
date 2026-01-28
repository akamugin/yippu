export default function GenderFilter({ value, onChange }) {
  const options = ["all", "male", "female", "unisex"];

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            border: "1px solid #ddd",
            cursor: "pointer",
            background: value === opt ? "#111" : "white",
            color: value === opt ? "white" : "#111",
            fontSize: 16,
          }}
        >
          {opt.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
