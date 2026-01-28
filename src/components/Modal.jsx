export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(900px, 100%)",
          maxHeight: "85vh",
          overflow: "auto",
          background: "white",
          borderRadius: 16,
          padding: 16,
          border: "1px solid #eee",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div>
            <div style={{ fontWeight: 800, fontSize: 20 }}>{title}</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "1px solid #ddd",
              background: "white",
              borderRadius: 10,
              padding: "6px 10px",
              cursor: "pointer",
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
