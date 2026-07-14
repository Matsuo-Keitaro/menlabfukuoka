// ===============================
// Tweaks Panel App
// テキスト・色・フォントをオンライン編集
// ===============================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#5a9d66",
  "primaryDeep": "#386c42",
  "accentColor": "#f7d97a",
  "bgColor": "#fffaf1",
  "fontFamily": "zen-maru",
  "roundness": 20,
  "inlineEdit": false,
  "brandName": "メンタルヘルスラボの訪問看護",
  "brandSub": "Fukuoka Visit Nursing",
  "heroTag": "福岡市・近郊対応｜訪問看護ステーション",
  "heroTitle1": "こころに、そっと",
  "heroTitle2": "寄り添う訪問看護",
  "heroTitle3": "を。",
  "heroLead": "精神疾患を抱えるご本人とご家族の暮らしを、看護師が定期的にご自宅へお伺いして支えます。就労支援との連携や家族へのサポートまで、あなたのペースで一緒に歩みます。",
  "heroCta1": "✉︎ 無料で相談してみる",
  "heroCta2": "LINEで問い合わせ",
  "contactPhone": "092-000-0000",
  "contactMail": "info@example.co.jp"
}/*EDITMODE-END*/;

// パレットプリセット
const COLOR_PRESETS = [
  { name: "グリーン(標準)", primary: "#5a9d66", deep: "#386c42", accent: "#f7d97a", bg: "#fffaf1" },
  { name: "セージ", primary: "#87a878", deep: "#4a6b3f", accent: "#e9d5a1", bg: "#f9f6ef" },
  { name: "ミント", primary: "#4fb896", deep: "#2a7562", accent: "#ffd6a5", bg: "#f5fbf8" },
  { name: "ソフトブルー", primary: "#5b9bd5", deep: "#2e6ba8", accent: "#f9d976", bg: "#f4f9fc" },
  { name: "ピンクベージュ", primary: "#e58b7f", deep: "#a04f43", accent: "#f7d97a", bg: "#fdf6f2" },
  { name: "ラベンダー", primary: "#8a7fbd", deep: "#524794", accent: "#f7c56d", bg: "#f8f5fb" }
];

const FONT_OPTIONS = [
  { value: "zen-maru", label: "丸ゴシック(標準)" },
  { value: "zen-kaku", label: "角ゴシック" },
  { value: "noto-serif", label: "明朝体" }
];

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Apply CSS variables globally
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--green-500', t.primaryColor);
    root.style.setProperty('--green-600', shade(t.primaryColor, -0.1));
    root.style.setProperty('--green-700', t.primaryDeep);
    root.style.setProperty('--green-400', shade(t.primaryColor, 0.15));
    root.style.setProperty('--green-300', shade(t.primaryColor, 0.3));
    root.style.setProperty('--green-200', shade(t.primaryColor, 0.5));
    root.style.setProperty('--green-100', shade(t.primaryColor, 0.75));
    root.style.setProperty('--green-50', shade(t.primaryColor, 0.9));
    root.style.setProperty('--yellow-accent', t.accentColor);
    root.style.setProperty('--cream', t.bgColor);
    root.style.setProperty('--radius-md', t.roundness + 'px');
    root.style.setProperty('--radius-lg', (t.roundness * 1.6) + 'px');

    // Font
    const fontMap = {
      "zen-maru": '"Zen Maru Gothic", "Hiragino Maru Gothic ProN", sans-serif',
      "zen-kaku": '"Zen Kaku Gothic New", "Hiragino Sans", sans-serif',
      "noto-serif": '"Noto Serif JP", "Yu Mincho", serif'
    };
    root.style.setProperty('--font-jp', fontMap[t.fontFamily] || fontMap["zen-maru"]);
    root.style.setProperty('--font-jp-body', fontMap[t.fontFamily] || fontMap["zen-maru"]);
  }, [t.primaryColor, t.primaryDeep, t.accentColor, t.bgColor, t.fontFamily, t.roundness]);

  // Apply text content to elements with data-tw
  React.useEffect(() => {
    document.querySelectorAll('[data-tw]').forEach(el => {
      const key = el.getAttribute('data-tw');
      if (t[key] !== undefined) {
        // Only replace text if it's a simple text node (no nested spans with class 'em' etc)
        // We use a delicate replacement: if the element has HTML markup, we skip auto-replace
        if (!el.querySelector('.em, .accent, .green-word, .sub')) {
          el.textContent = t[key];
        }
      }
    });
  }, [t.brandName, t.brandSub, t.heroTag, t.heroTitle1, t.heroTitle2, t.heroTitle3,
      t.heroLead, t.heroCta1, t.heroCta2, t.contactPhone, t.contactMail]);

  // Enable inline editing on ALL text-bearing elements
  React.useEffect(() => {
    // Selector: all common text elements across the page
    const selector = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'li', 'span',
      '.btn', '.header-cta',
      '.cm-value', '.cm-label',
      'summary', '.faq-answer',
      '.voice-tag', '.role', '.name', '.bio',
      '.section-eyebrow',
      '.hero-tag', '.hero-quick-item',
      '.pricing-card .big',
      '.flow-num .step-value', '.flow-num .step-label',
      '.brand-name', '.brand-name .sub',
      'label'
    ].join(', ');

    // Exclude: elements inside forms (inputs already editable), tweaks panel itself, script/style, icon-only elements
    const excluded = (el) => {
      if (el.closest('.twk-root, .twk-panel, [data-tweaks-root]')) return true;
      if (el.closest('input, select, textarea, script, style')) return true;
      if (el.closest('form')) return true; // form fields are already interactive
      // skip pure icon spans (single emoji / very short and no text children)
      const txt = el.textContent.trim();
      if (!txt) return true;
      return false;
    };

    document.querySelectorAll(selector).forEach(el => {
      if (excluded(el)) {
        el.removeAttribute('contenteditable');
        return;
      }
      // Only make the deepest text container editable — skip if a descendant is already editable
      if (el.querySelector('[contenteditable="true"]') && t.inlineEdit) {
        // still allow — parent editing overrides children, but we'll allow both for simplicity
      }
      if (t.inlineEdit) {
        el.setAttribute('contenteditable', 'true');
        el.setAttribute('spellcheck', 'false');
      } else {
        el.removeAttribute('contenteditable');
        el.removeAttribute('spellcheck');
      }
    });

    // Prevent link navigation when in edit mode
    const clickHandler = (e) => {
      if (!t.inlineEdit) return;
      const a = e.target.closest('a');
      if (a && !a.closest('.twk-root, .twk-panel')) {
        e.preventDefault();
      }
    };
    if (t.inlineEdit) {
      document.addEventListener('click', clickHandler, true);
    }
    return () => {
      document.removeEventListener('click', clickHandler, true);
    };
  }, [t.inlineEdit]);

  const applyPreset = (preset) => {
    setTweak({
      primaryColor: preset.primary,
      primaryDeep: preset.deep,
      accentColor: preset.accent,
      bgColor: preset.bg
    });
  };

  return (
    <window.TweaksPanel title="Tweaks">
      <window.TweakSuggestionBar suggestions={[
        "ヒーローのキャッチコピーを『心の回復を、家から。』に変えて",
        "色をもう少し落ち着いたセージグリーンに",
        "スタッフの名前と役職を実際のものに差し替えて",
        "料金セクションを削除して"
      ]} />

      <window.TweakSection title="カラーパレット">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
          {COLOR_PRESETS.map(p => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              style={{
                padding: '10px 6px',
                border: t.primaryColor === p.primary ? `2px solid ${p.primary}` : '1.5px solid rgba(0,0,0,0.08)',
                borderRadius: 10,
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                fontWeight: 600,
                color: '#333'
              }}
            >
              <div style={{ display: 'flex', gap: 3 }}>
                <span style={{ width: 18, height: 18, borderRadius: 4, background: p.primary }}></span>
                <span style={{ width: 12, height: 18, borderRadius: 4, background: p.deep }}></span>
                <span style={{ width: 12, height: 18, borderRadius: 4, background: p.accent }}></span>
              </div>
              {p.name}
            </button>
          ))}
        </div>
        <window.TweakColor label="メインカラー" value={t.primaryColor} onChange={v => setTweak('primaryColor', v)} />
        <window.TweakColor label="濃色(見出し等)" value={t.primaryDeep} onChange={v => setTweak('primaryDeep', v)} />
        <window.TweakColor label="アクセント(ハイライト)" value={t.accentColor} onChange={v => setTweak('accentColor', v)} />
        <window.TweakColor label="背景色" value={t.bgColor} onChange={v => setTweak('bgColor', v)} />
      </window.TweakSection>

      <window.TweakSection title="タイポグラフィ・スタイル">
        <window.TweakSelect
          label="フォント"
          value={t.fontFamily}
          options={FONT_OPTIONS}
          onChange={v => setTweak('fontFamily', v)}
        />
        <window.TweakSlider
          label="角の丸み"
          value={t.roundness}
          min={4} max={40} step={2}
          onChange={v => setTweak('roundness', v)}
        />
      </window.TweakSection>

      <window.TweakSection title="🖱️ クリック編集モード">
        <window.TweakToggle
          label="ページ内テキストを直接編集"
          value={t.inlineEdit}
          onChange={v => setTweak('inlineEdit', v)}
        />
        <p style={{ fontSize: 11, color: '#666', margin: '8px 0 0', lineHeight: 1.6 }}>
          ONにすると、見出し・本文・ボタンなど<strong>すべてのテキストをクリックして直接書き換え</strong>できます。編集後、他の場所をクリックすると保存されます。
        </p>
      </window.TweakSection>

      <window.TweakSection title="ブランド・ヘッダー">
        <window.TweakText label="サービス名" value={t.brandName} onChange={v => setTweak('brandName', v)} />
        <window.TweakText label="英語表記" value={t.brandSub} onChange={v => setTweak('brandSub', v)} />
      </window.TweakSection>

      <window.TweakSection title="ファーストビュー">
        <window.TweakText label="タグライン(小)" value={t.heroTag} onChange={v => setTweak('heroTag', v)} />
        <window.TweakText label="見出し1行目" value={t.heroTitle1} onChange={v => setTweak('heroTitle1', v)} />
        <window.TweakText label="見出し2行目(強調)" value={t.heroTitle2} onChange={v => setTweak('heroTitle2', v)} />
        <window.TweakText label="見出し末尾" value={t.heroTitle3} onChange={v => setTweak('heroTitle3', v)} />
        <window.TweakText label="リード文" value={t.heroLead} onChange={v => setTweak('heroLead', v)} multiline />
        <window.TweakText label="CTAボタン1" value={t.heroCta1} onChange={v => setTweak('heroCta1', v)} />
        <window.TweakText label="CTAボタン2(LINE)" value={t.heroCta2} onChange={v => setTweak('heroCta2', v)} />
      </window.TweakSection>

      <window.TweakSection title="お問い合わせ先">
        <window.TweakText label="電話番号" value={t.contactPhone} onChange={v => setTweak('contactPhone', v)} />
        <window.TweakText label="メールアドレス" value={t.contactMail} onChange={v => setTweak('contactMail', v)} />
      </window.TweakSection>

      <div style={{ padding: '12px', background: 'rgba(90, 157, 102, 0.08)', borderRadius: 10, margin: '12px 0 0', fontSize: 11, lineHeight: 1.6, color: '#555' }}>
        💡 <strong>ヒント</strong>: 画像を差し替えるにはページ内の画像プレースホルダーに直接ドラッグ&ドロップしてください。
      </div>
    </window.TweaksPanel>
  );
}

// Helper: lighten/darken hex color
function shade(hex, amount) {
  // amount: -1 (fully black) to +1 (fully white)
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const adjust = (v) => {
    if (amount >= 0) return Math.round(v + (255 - v) * amount);
    return Math.round(v * (1 + amount));
  };
  const toHex = n => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
  return '#' + toHex(adjust(r)) + toHex(adjust(g)) + toHex(adjust(b));
}

// ===============================
// Edit Mode Floating Buttons
// ページ上に常時表示される編集操作ボタン群
// ===============================
function EditModeButton() {
  const [textEditing, setTextEditing] = React.useState(false);
  const [layoutEditing, setLayoutEditing] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.detail && 'inlineEdit' in e.detail) {
        setTextEditing(e.detail.inlineEdit);
      }
    };
    window.addEventListener('tweakchange', handler);
    return () => window.removeEventListener('tweakchange', handler);
  }, []);

  const toggleText = () => {
    const next = !textEditing;
    setTextEditing(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { inlineEdit: next } }, '*');
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: { inlineEdit: next } }));
  };

  const toggleLayout = () => {
    if (window.EditEngine) {
      window.EditEngine.toggle();
      setLayoutEditing(window.EditEngine.isActive());
    }
  };

  const resetLayout = () => {
    if (window.EditEngine) window.EditEngine.reset();
  };

  const showDeleted = () => {
    if (window.EditEngine) window.EditEngine.showDeleted();
  };

  const btnBase = {
    padding: '10px 16px',
    borderRadius: 999,
    border: 'none',
    color: 'white',
    fontFamily: '"Zen Maru Gothic", sans-serif',
    fontWeight: 700,
    fontSize: 13,
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    transition: 'all .2s',
    whiteSpace: 'nowrap'
  };

  return (
    <>
      {/* Master toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          ...btnBase,
          position: 'fixed',
          top: 80,
          right: 20,
          zIndex: 9998,
          background: menuOpen ? '#2d3d33' : '#386c42',
          padding: '12px 18px'
        }}
        title="編集メニュー"
      >
        {menuOpen ? '✕ 閉じる' : '✏️ 編集メニュー'}
      </button>

      {/* Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 130,
          right: 20,
          zIndex: 9997,
          background: 'white',
          borderRadius: 16,
          padding: 12,
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          border: '1px solid rgba(56, 108, 66, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          minWidth: 240
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#666', letterSpacing: '0.05em', padding: '4px 4px 0' }}>編集モード</div>

          <button
            onClick={toggleText}
            style={{
              ...btnBase,
              background: textEditing ? '#c46236' : '#5a9d66',
              width: '100%',
              justifyContent: 'flex-start'
            }}
          >
            {textEditing ? '✓' : '✏️'} テキスト編集 {textEditing && <span style={{ fontSize: 10, opacity: 0.9 }}>ON</span>}
          </button>

          <button
            onClick={toggleLayout}
            style={{
              ...btnBase,
              background: layoutEditing ? '#c46236' : '#488a54',
              width: '100%',
              justifyContent: 'flex-start'
            }}
          >
            {layoutEditing ? '✓' : '📦'} レイアウト編集（並び替え・削除） {layoutEditing && <span style={{ fontSize: 10, opacity: 0.9 }}>ON</span>}
          </button>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '4px 0' }}></div>

          <button
            onClick={showDeleted}
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              border: '1px solid rgba(0,0,0,0.1)',
              background: 'white',
              color: '#333',
              fontFamily: '"Zen Maru Gothic", sans-serif',
              fontWeight: 600,
              fontSize: 12,
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            🗑️ 削除した要素を確認・復元
          </button>

          <button
            onClick={resetLayout}
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              border: '1px solid rgba(0,0,0,0.1)',
              background: 'white',
              color: '#c46236',
              fontFamily: '"Zen Maru Gothic", sans-serif',
              fontWeight: 600,
              fontSize: 12,
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            ↺ レイアウトを初期状態に戻す
          </button>

          <div style={{
            padding: '10px 12px',
            background: 'rgba(90, 157, 102, 0.08)',
            borderRadius: 10,
            fontSize: 11,
            lineHeight: 1.7,
            color: '#555'
          }}>
            💡 <strong>テキスト編集</strong>: 文字をクリックで書き換え<br/>
            💡 <strong>レイアウト編集</strong>:<br/>
            &nbsp;&nbsp;・要素を<strong>ドラッグ&ドロップ</strong>で自由に移動<br/>
            &nbsp;&nbsp;・ツールバーの ▲▼ で1つずつ移動<br/>
            &nbsp;&nbsp;・✕ ボタンで削除（後で復元可）
          </div>
        </div>
      )}
    </>
  );
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root).render(
  <>
    <App />
    <EditModeButton />
  </>
);
