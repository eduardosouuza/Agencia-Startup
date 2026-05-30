/* ============================================================
   DevAuto Pro — Tweaks island
   Applies values to CSS variables + body data-attributes.
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#8b5cf6", "#c026d3"],
  "anim": "rich",
  "headFont": "'IBM Plex Mono', ui-monospace, monospace",
  "hero": "split",
  "cards": "outline"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  ["#8b5cf6", "#c026d3"], // violeta → magenta (default)
  ["#7c3aed", "#a21caf"], // roxo profundo
  ["#6366f1", "#8b5cf6"], // índigo → violeta
  ["#a855f7", "#ec4899"], // ametista → rosa
];

const FONT_OPTIONS = [
  { value: "'IBM Plex Mono', ui-monospace, monospace", label: "Mono (IBM Plex)" },
  { value: "'Space Grotesk', sans-serif", label: "Grotesk" },
  { value: "'Sora', sans-serif", label: "Sora" },
];

function DevAutoTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // ----- apply accent colors -----
  React.useEffect(() => {
    const pair = Array.isArray(t.accent) ? t.accent : [t.accent, t.accent];
    const root = document.documentElement;
    root.style.setProperty('--accent', pair[0]);
    root.style.setProperty('--accent-2', pair[1] || pair[0]);
  }, [t.accent]);

  // ----- heading font -----
  React.useEffect(() => {
    document.documentElement.style.setProperty('--font-head', t.headFont);
  }, [t.headFont]);

  // ----- body data-attributes -----
  React.useEffect(() => { document.body.setAttribute('data-anim', t.anim); }, [t.anim]);
  React.useEffect(() => { document.body.setAttribute('data-hero', t.hero); }, [t.hero]);
  React.useEffect(() => { document.body.setAttribute('data-cards', t.cards); }, [t.cards]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Cor de destaque" />
      <TweakColor
        label="Paleta"
        value={t.accent}
        options={ACCENT_OPTIONS}
        onChange={(v) => setTweak('accent', v)}
      />

      <TweakSection label="Tipografia" />
      <TweakSelect
        label="Fonte dos títulos"
        value={t.headFont}
        options={FONT_OPTIONS}
        onChange={(v) => setTweak('headFont', v)}
      />

      <TweakSection label="Movimento" />
      <TweakRadio
        label="Animações"
        value={t.anim}
        options={[
          { value: 'off', label: 'Off' },
          { value: 'subtle', label: 'Sutil' },
          { value: 'rich', label: 'Rico' },
        ]}
        onChange={(v) => setTweak('anim', v)}
      />
      <TweakButton label="Repetir contadores" secondary
        onClick={() => window.__devauto && window.__devauto.replayCounters()} />

      <TweakSection label="Layout" />
      <TweakRadio
        label="Hero"
        value={t.hero}
        options={[
          { value: 'split', label: 'Split' },
          { value: 'centered', label: 'Centro' },
          { value: 'minimal', label: 'Clean' },
        ]}
        onChange={(v) => setTweak('hero', v)}
      />
      <TweakRadio
        label="Cards"
        value={t.cards}
        options={[
          { value: 'outline', label: 'Linha' },
          { value: 'filled', label: 'Sólido' },
          { value: 'gradient', label: 'Borda' },
        ]}
        onChange={(v) => setTweak('cards', v)}
      />
    </TweaksPanel>
  );
}

(function mountTweaks() {
  const el = document.createElement('div');
  el.id = 'tweaks-root';
  el.setAttribute('data-omelette-chrome', '');
  document.body.appendChild(el);
  ReactDOM.createRoot(el).render(<DevAutoTweaks />);
})();
