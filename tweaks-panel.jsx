/* ============================================================
   DevAuto Pro — Tweaks panel helpers
   Defines: useTweaks, TweaksPanel, TweakSection,
            TweakColor, TweakSelect, TweakRadio, TweakButton
   ============================================================ */

/* ---------- Hook ---------- */
function useTweaks(defaults) {
  const [tweaks, setTweaksState] = React.useState(defaults);
  const setTweak = (key, value) =>
    setTweaksState((prev) => ({ ...prev, [key]: value }));
  return [tweaks, setTweak];
}

/* ---------- Panel shell ---------- */
function TweaksPanel({ title, children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div id="tweaks-panel" style={{
      position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999,
      fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px',
    }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: '#8b5cf6', color: '#fff', border: 'none',
          borderRadius: '8px', padding: '8px 14px', cursor: 'pointer',
          fontFamily: 'inherit', fontSize: '12px', fontWeight: 600,
        }}
      >
        {open ? '✕ Fechar' : '⚙ ' + (title || 'Tweaks')}
      </button>

      {open && (
        <div style={{
          background: '#1a1625', border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: '12px', padding: '16px', marginTop: '8px',
          minWidth: '220px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          maxHeight: '80vh', overflowY: 'auto',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ---------- Section label ---------- */
function TweakSection({ label }) {
  return (
    <div style={{
      color: '#8b5cf6', fontWeight: 600, fontSize: '10px',
      textTransform: 'uppercase', letterSpacing: '0.08em',
      marginTop: '14px', marginBottom: '6px', paddingBottom: '4px',
      borderBottom: '1px solid rgba(139,92,246,0.2)',
    }}>
      {label}
    </div>
  );
}

/* ---------- Color swatch picker ---------- */
function TweakColor({ label, value, options, onChange }) {
  const normalize = (v) => (Array.isArray(v) ? v[0] : v);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <span style={{ color: '#c4b5fd', flex: 1 }}>{label}</span>
      <div style={{ display: 'flex', gap: '5px' }}>
        {options.map((opt, i) => {
          const color = Array.isArray(opt) ? opt[0] : opt;
          const selected = normalize(value) === normalize(opt);
          return (
            <button
              key={i}
              onClick={() => onChange(opt)}
              title={color}
              style={{
                width: '20px', height: '20px', borderRadius: '50%',
                background: color, border: selected ? '2px solid #fff' : '2px solid transparent',
                cursor: 'pointer', padding: 0,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Select / dropdown ---------- */
function TweakSelect({ label, value, options, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <span style={{ color: '#c4b5fd', flex: 1 }}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: '#2d1f4e', color: '#e9d5ff', border: '1px solid rgba(139,92,246,0.4)',
          borderRadius: '6px', padding: '4px 6px', fontFamily: 'inherit', fontSize: '11px',
          cursor: 'pointer',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

/* ---------- Radio button group ---------- */
function TweakRadio({ label, value, options, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
      <span style={{ color: '#c4b5fd', flex: 1, minWidth: '70px' }}>{label}</span>
      <div style={{ display: 'flex', gap: '4px' }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              background: value === opt.value ? '#8b5cf6' : '#2d1f4e',
              color: value === opt.value ? '#fff' : '#c4b5fd',
              border: '1px solid rgba(139,92,246,0.4)',
              borderRadius: '5px', padding: '3px 8px',
              fontFamily: 'inherit', fontSize: '11px', cursor: 'pointer',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Action button ---------- */
function TweakButton({ label, onClick, secondary }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <button
        onClick={onClick}
        style={{
          background: secondary ? 'transparent' : '#8b5cf6',
          color: secondary ? '#c4b5fd' : '#fff',
          border: '1px solid rgba(139,92,246,0.5)',
          borderRadius: '6px', padding: '5px 12px', width: '100%',
          fontFamily: 'inherit', fontSize: '11px', cursor: 'pointer',
        }}
      >
        {label}
      </button>
    </div>
  );
}
