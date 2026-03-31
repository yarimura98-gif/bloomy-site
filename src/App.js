import { useState, useEffect, useRef } from "react";

const COMPANY_INFO = `
Bloomyは動画編集・グラフィックデザインを専門とするクリエイティブスタジオです。
代表クリエイター: 吉村愛理沙（動画クリエイター）
使用ツール: Adobe Premiere Pro, Adobe After Effects, CapCut, Canva, 生成AI
メインサービス: ビジネス動画編集（YouTube・SNS・オンライン講座・セミナー動画など）
サブサービス: 簡易グラフィックデザイン（サムネイル・バナーなど）
基本編集プラン: 5分以内 35,000円（カット編集・フルテロップ・色調補正・BGM挿入など、修正2回無料）
動画尺オプション: 10〜15分+5,000円、15〜20分+10,000円、20〜25分+15,000円
定期プラン: 月3本（5分動画）100,000円/月
主な追加オプション: サムネイル制作+5,000円、ショート動画切り抜き+3,000円〜、テロップ演出強化+5,000円、特急納品+5,000円など
制作の流れ: 相談→素材共有→編集→初稿提出（修正2回無料）→最終納品（MP4高画質）
会社名: Bloomy（ブルーミー）— 才能の開花・人が集まる場所という意味の造語
理念: 才能が、ここで咲く。クリエイターが芽吹く・チームで成長・才能が広がる
お問い合わせ: w.k.dsya@gmail.com
`;

const tools = [
  { name: "Premiere Pro", short: "Pr", color: "#9999FF" },
  { name: "After Effects", short: "Ae", color: "#9999FF" },
  { name: "CapCut", short: "Cc", color: "#ff6b6b" },
  { name: "Canva", short: "Cv", color: "#00C4CC" },
  { name: "生成AI", short: "AI", color: "#10a37f" },
];

const services = [
  {
    icon: "▶", title: "動画編集", main: true,
    items: ["YouTube・SNS動画", "企業PR・紹介動画", "リール・ショート動画", "テロップ・モーショングラフィックス"],
  },
  {
    icon: "◈", title: "グラフィックデザイン", main: false,
    items: ["YouTube サムネイル", "SNS バナー・投稿画像", "簡易ロゴ・アイコン"],
  },
];

const works = [
  { label: "ビジネス動画", tag: "Business", accent: "#2563eb", desc: "商品・サービスの魅力を動画で伝える" },
  { label: "企業PR", tag: "PR", accent: "#1d4ed8", desc: "会社の想いをストーリーで届ける" },
  { label: "イベントオープニング", tag: "Event", accent: "#7c3aed", desc: "会場を盛り上げるオープニング映像" },
];

const flow = [
  { num: "01", title: "ご相談・ヒアリング", desc: "動画の用途やイメージをお伺いします。「こんな動画作れる？」などお気軽にどうぞ。", icon: "💬" },
  { num: "02", title: "素材データ共有", desc: "動画素材・画像・参考動画などをご共有いただきます。", icon: "📁" },
  { num: "03", title: "編集作業", desc: "ヒアリング内容をもとに動画編集を行います。", icon: "🎬" },
  { num: "04", title: "初稿提出・修正対応", desc: "ご確認いただき修正対応いたします。修正2回まで無料です。", icon: "✏️" },
  { num: "05", title: "最終納品", desc: "MP4形式にて高画質で納品いたします。", icon: "✅" },
];

const options = [
  { label: "サムネイル制作", price: "+5,000円" },
  { label: "ショート動画切り抜き 1本", price: "+3,000円" },
  { label: "ショート動画切り抜き 5本パック", price: "+12,000円" },
  { label: "テロップ演出強化", price: "+5,000円" },
  { label: "構成整理サポート", price: "+10,000円" },
  { label: "SNS投稿最適化（縦動画・冒頭フック）", price: "+3,000円" },
  { label: "素材尺追加（30秒ごと）", price: "+2,000円" },
  { label: "特急納品（3日以内）", price: "+5,000円" },
  { label: "実績公開不可", price: "+3,000円" },
  { label: "秘密保持契約書作成", price: "+5,000円" },
  { label: "修正追加（3回目以降）", price: "+2,000円 / 回" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Section({ children, style, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.65s ${delay}s ease, transform 0.65s ${delay}s ease`, ...style }}>
      {children}
    </div>
  );
}

function TimelineAnimation() {
  const tracks = [
    { label: "VIDEO", color: "#2563eb", clips: [{ x: 0, w: 38 }, { x: 42, w: 28 }, { x: 74, w: 22 }] },
    { label: "AUDIO", color: "#0ea5e9", clips: [{ x: 0, w: 60 }, { x: 65, w: 32 }] },
    { label: "TEXT", color: "#7c3aed", clips: [{ x: 8, w: 20 }, { x: 50, w: 18 }, { x: 72, w: 25 }] },
    { label: "FX", color: "#d4a200", clips: [{ x: 20, w: 12 }, { x: 60, w: 10 }] },
  ];
  const [playhead, setPlayhead] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setPlayhead(p => p >= 96 ? 0 : p + 0.4), 30);
    return () => clearInterval(id);
  }, [playing]);
  return (
    <div style={{ background: "#0a0f1e", borderRadius: 12, padding: "20px 20px 16px", border: "1px solid rgba(37,99,235,0.25)", fontFamily: "monospace" }}>
      <div style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
        <div style={{ flex: 1, background: "#050a14", borderRadius: 8, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(37,99,235,0.2)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(37,99,235,${0.05 + playhead * 0.002}) 0%, rgba(124,58,237,${0.03 + playhead * 0.001}) 100%)` }} />
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 10, letterSpacing: 2 }}>PREVIEW</span>
          <span style={{ position: "absolute", bottom: 6, right: 8, fontSize: 9, color: "#2563eb", letterSpacing: 1 }}>
            {String(Math.floor(playhead * 0.3)).padStart(2, "0")}:{String(Math.floor((playhead * 0.3 % 1) * 60)).padStart(2, "0")}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <button onClick={() => setPlaying(p => !p)} style={{ padding: "6px 14px", borderRadius: 6, background: playing ? "rgba(37,99,235,0.2)" : "rgba(37,99,235,0.5)", border: "1px solid rgba(37,99,235,0.4)", color: "#93c5fd", fontSize: 12, cursor: "pointer", fontFamily: "monospace" }}>{playing ? "⏸" : "▶"}</button>
          <button onClick={() => setPlayhead(0)} style={{ padding: "6px 14px", borderRadius: 6, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer", fontFamily: "monospace" }}>⏮</button>
        </div>
      </div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", display: "flex", marginBottom: 4, marginLeft: 36 }}>
        {Array.from({ length: 10 }, (_, i) => <div key={i} style={{ flex: 1, borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: 2 }}>{i * 10}s</div>)}
      </div>
      <div style={{ position: "relative" }}>
        {tracks.map((t, ti) => (
          <div key={ti} style={{ display: "flex", alignItems: "center", marginBottom: 5, gap: 8 }}>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", width: 30, textAlign: "right", flexShrink: 0, letterSpacing: 1 }}>{t.label}</span>
            <div style={{ flex: 1, height: 18, background: "rgba(255,255,255,0.04)", borderRadius: 3, position: "relative", overflow: "hidden" }}>
              {t.clips.map((c, ci) => (
                <div key={ci} style={{ position: "absolute", left: `${c.x}%`, width: `${c.w}%`, height: "100%", background: t.color + "55", borderLeft: `2px solid ${t.color}`, borderRadius: 2, animation: `clipShimmer 2s ${ci * 0.3}s infinite alternate` }}>
                  <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(90deg, transparent, transparent 6px, ${t.color}22 6px, ${t.color}22 7px)` }} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `calc(${playhead}% * 0.862 + 38px)`, width: 1.5, background: "#f59e0b", pointerEvents: "none", zIndex: 10 }}>
          <div style={{ width: 7, height: 7, background: "#f59e0b", borderRadius: "50%", marginLeft: -3, marginTop: -2 }} />
        </div>
      </div>
      <style>{`
        @keyframes clipShimmer{from{opacity:.7}to{opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
      `}</style>
    </div>
  );
}

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "assistant", text: "こんにちは！料金や制作の流れなど、お気軽にご質問ください。" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  async function send() {
    if (!input.trim() || loading) return;
    const q = input.trim(); setInput("");
    setMsgs(m => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `あなたはBloomyのAIアシスタントです。以下の情報をもとに日本語で丁寧かつ簡潔に答えてください。\n${COMPANY_INFO}`,
          messages: msgs.concat({ role: "user", text: q }).filter(m => !(m.role === "assistant" && m.text.includes("こんにちは"))).map(m => ({ role: m.role, content: m.text }))
        })
      });
      const data = await res.json();
      setMsgs(m => [...m, { role: "assistant", text: data.content?.find(c => c.type === "text")?.text || "もう一度お試しください。" }]);
    } catch { setMsgs(m => [...m, { role: "assistant", text: "エラーが発生しました。" }]); }
    setLoading(false);
  }
  return (
    <>
      <button onClick={() => setOpen(o => !o)} style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999, width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", border: "none", cursor: "pointer", fontSize: 20, boxShadow: "0 4px 20px rgba(37,99,235,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", animation: "pulse 3s infinite" }}>💬</button>
      {open && (
        <div style={{ position: "fixed", bottom: 90, right: 28, zIndex: 998, width: 310, height: 400, borderRadius: 14, background: "#0d1528", border: "1px solid rgba(37,99,235,0.3)", boxShadow: "0 8px 40px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", background: "rgba(37,99,235,0.12)", borderBottom: "1px solid rgba(37,99,235,0.2)", display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
            <p style={{ margin: 0, fontWeight: 500, color: "#bfdbfe", fontSize: 13 }}>Bloomy サポート</p>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "82%", padding: "8px 12px", borderRadius: 10, background: m.role === "user" ? "linear-gradient(135deg,#1d4ed8,#2563eb)" : "rgba(255,255,255,0.07)", color: m.role === "user" ? "#fff" : "#cbd5e1", fontSize: 13, lineHeight: 1.6 }}>{m.text}</div>
              </div>
            ))}
            {loading && <div style={{ display: "flex", gap: 4, padding: "8px 12px" }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb", animation: `pulse ${0.5+i*0.15}s infinite` }} />)}</div>}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: 10, borderTop: "1px solid rgba(37,99,235,0.15)", display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="メッセージを入力..." style={{ flex: 1, padding: "8px 12px", borderRadius: 20, border: "1px solid rgba(37,99,235,0.3)", background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontSize: 13, outline: "none" }} />
            <button onClick={send} style={{ padding: "8px 14px", borderRadius: 20, background: "#2563eb", border: "none", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>送信</button>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);

  const nav = ["サービス","料金","制作の流れ","実績","私たちについて","お問い合わせ"];

  return (
    <div translate="no" style={{ fontFamily: "'Helvetica Neue',Arial, sans-serif", background: "#070d1a", color: "#f1f5f9", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 40px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(7,13,26,0.96)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(37,99,235,0.15)" : "none", transition: "all 0.3s ease" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", letterSpacing: 1 }}><span style={{ color: "#2563eb" }}>B</span>loomy</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {nav.map(l => (
            <a key={l} href={`#${l}`} style={{ color: "rgba(241,245,249,0.55)", textDecoration: "none", fontSize: 12, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#f1f5f9"} onMouseLeave={e => e.target.style.color = "rgba(241,245,249,0.55)"}>{l}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 40px 60px", maxWidth: 1100, margin: "0 auto", gap: 60, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280, animation: "fadeUp 0.9s ease forwards" }}>
          <p style={{ fontSize: 11, letterSpacing: 4, color: "#2563eb", textTransform: "uppercase", marginBottom: 16 }}>Creative Video Studio</p>
          <h1 style={{ fontSize: "clamp(38px,5.5vw,66px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 24px", color: "#f1f5f9" }}>
            あなたの想いを、<br />
            <span style={{ background: "linear-gradient(90deg,#2563eb,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>映像にする。</span>
          </h1>
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            {[["🌱","クリエイターが芽吹く"],["🌿","チームで成長"],["🌸","才能が広がる"]].map(([icon, label], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.22)", fontSize: 12, color: "#93c5fd", fontWeight: 500 }}>
                <span style={{ fontSize: 13 }}>{icon}</span>{label}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, color: "rgba(241,245,249,0.6)", lineHeight: 1.9, maxWidth: 420, marginBottom: 36 }}>
            「伝えたいのに伝わらない」そのもどかしさ、動画で解決します。<br />あなたのビジネスの魅力を、見た人の心に届く映像へ。
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
            {tools.map(t => (
              <span key={t.name} style={{ padding: "5px 14px", borderRadius: 20, background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", fontSize: 12, color: "#93c5fd", fontWeight: 500 }}>{t.name}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
<a href="#お問い合わせ" style={{ padding: "13px 28px", borderRadius: 8, background: "#2563eb", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 20px rgba(37,99,235,0.4)", textDecoration: "none", display: "inline-block" }}>お問い合わせ</a>
<a href="#料金" style={{ padding: "13px 28px", borderRadius: 8, background: "transparent", border: "1px solid rgba(37,99,235,0.4)", color: "#93c5fd", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>料金を見る</a>         
        </div>
        <TimelineAnimation /> 
        </div>
      </section>

      {/* Services */}
      <section id="サービス" style={{ padding: "90px 40px", maxWidth: 1000, margin: "0 auto" }}>
        <Section>
          <p style={{ fontSize: 11, letterSpacing: 4, color: "#2563eb", textTransform: "uppercase", marginBottom: 10 }}>Services</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700, marginBottom: 12, color: "#f1f5f9" }}>提供するサービス</h2>
          <p style={{ fontSize: 14, color: "rgba(241,245,249,0.5)", marginBottom: 40, lineHeight: 1.8 }}>YouTube・SNS・オンライン講座など、ビジネス用途の動画編集を承っています。<br />視聴者に伝わりやすい構成とテンポの良い編集で「見やすい・分かりやすい動画」を制作いたします。</p>
        </Section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {services.map((s, i) => (
            <Section key={i} delay={i * 0.1}>
              <div style={{ padding: "32px 28px", borderRadius: 12, background: s.main ? "rgba(37,99,235,0.1)" : "rgba(255,255,255,0.04)", border: s.main ? "1px solid rgba(37,99,235,0.35)" : "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }}>
                {s.main && <span style={{ position: "absolute", top: 16, right: 16, fontSize: 10, padding: "3px 10px", borderRadius: 20, background: "rgba(37,99,235,0.25)", color: "#93c5fd", fontWeight: 500, letterSpacing: 1 }}>MAIN</span>}
                <div style={{ fontSize: 22, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#f1f5f9" }}>{s.title}</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(241,245,249,0.65)" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2563eb", flexShrink: 0 }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          ))}
        </div>
        <Section delay={0.3}>
          <div style={{ marginTop: 24, padding: "20px 24px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(241,245,249,0.4)", letterSpacing: 2, textTransform: "uppercase", flexShrink: 0 }}>使用ツール</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {tools.map(t => (
                <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ width: 22, height: 22, borderRadius: 4, background: t.color + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: t.color }}>{t.short}</div>
                  <span style={{ fontSize: 13, color: "rgba(241,245,249,0.7)" }}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Pricing */}
      <section id="料金" style={{ padding: "90px 40px", background: "rgba(37,99,235,0.04)", borderTop: "1px solid rgba(37,99,235,0.1)", borderBottom: "1px solid rgba(37,99,235,0.1)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Section>
            <p style={{ fontSize: 11, letterSpacing: 4, color: "#2563eb", textTransform: "uppercase", marginBottom: 10 }}>Pricing</p>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700, marginBottom: 10, color: "#f1f5f9" }}>料金プラン</h2>
            <p style={{ fontSize: 14, color: "rgba(241,245,249,0.5)", marginBottom: 40 }}>すべて税込表示。まずはお気軽にご相談ください。</p>
          </Section>

          {/* Main plans */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginBottom: 24 }}>
            {/* Basic */}
            <Section delay={0.05}>
              <div style={{ borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "28px 24px", position: "relative" }}>
                <p style={{ margin: "0 0 4px", fontSize: 12, color: "#93c5fd", letterSpacing: 2, textTransform: "uppercase" }}>基本編集プラン</p>
                <p style={{ margin: "0 0 4px", fontSize: 13, color: "rgba(241,245,249,0.5)" }}>5分以内の総編集</p>
                <p style={{ margin: "12px 0 20px", fontSize: 36, fontWeight: 800, color: "#f1f5f9" }}>¥35,000</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["カット編集","フルテロップ","色調補正","音量調整","サイドテロップ（タイトル/チャンネル名）","画像・動画素材挿入","BGM / SE挿入（著作権フリー）"].map(item => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "rgba(241,245,249,0.7)" }}>
                      <span style={{ color: "#2563eb", flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                    </div>
                  ))}
                  <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6, background: "rgba(37,99,235,0.15)", fontSize: 12, color: "#93c5fd" }}>修正2回まで無料</div>
                </div>
              </div>
            </Section>

            {/* Monthly */}
            <Section delay={0.1}>
              <div style={{ borderRadius: 14, background: "rgba(37,99,235,0.1)", border: "2px solid rgba(37,99,235,0.4)", padding: "28px 24px", position: "relative" }}>
                <span style={{ position: "absolute", top: -1, left: 24, fontSize: 10, padding: "4px 12px", borderRadius: "0 0 8px 8px", background: "#2563eb", color: "#fff", fontWeight: 600, letterSpacing: 1 }}>おすすめ</span>
                <p style={{ margin: "8px 0 4px", fontSize: 12, color: "#93c5fd", letterSpacing: 2, textTransform: "uppercase" }}>定期編集プラン</p>
                <p style={{ margin: "0 0 4px", fontSize: 13, color: "rgba(241,245,249,0.5)" }}>月3本（5分動画）</p>
                <p style={{ margin: "12px 0 4px", fontSize: 36, fontWeight: 800, color: "#f1f5f9" }}>¥100,000<span style={{ fontSize: 14, fontWeight: 400, color: "rgba(241,245,249,0.4)" }}> / 月</span></p>
                <p style={{ margin: "0 0 20px", fontSize: 12, color: "#22c55e" }}>単発より最大¥5,000お得</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["毎月3本の動画編集","基本編集プランの全内容込み","継続的な発信をサポート","優先対応"].map(item => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "rgba(241,245,249,0.7)" }}>
                      <span style={{ color: "#22c55e", flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Length options */}
            <Section delay={0.15}>
              <div style={{ borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "28px 24px" }}>
                <p style={{ margin: "0 0 4px", fontSize: 12, color: "rgba(241,245,249,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>動画尺オプション</p>
                <p style={{ margin: "0 0 20px", fontSize: 13, color: "rgba(241,245,249,0.5)" }}>基本プランに追加</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[["10〜15分","＋5,000円"],["15〜20分","＋10,000円"],["20〜25分","＋15,000円"]].map(([range, price]) => (
                    <div key={range} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <span style={{ fontSize: 14, color: "rgba(241,245,249,0.8)" }}>{range}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#60a5fa" }}>{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>

          {/* Options accordion */}
          <Section delay={0.2}>
            <div style={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <button onClick={() => setOpenOption(o => !o)} style={{ width: "100%", padding: "18px 24px", background: "rgba(255,255,255,0.04)", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#f1f5f9" }}>追加オプション一覧</span>
                <span style={{ fontSize: 18, color: "#2563eb", transform: openOption ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>⌄</span>
              </button>
              {openOption && (
                <div style={{ padding: "8px 24px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 8 }}>
                  {options.map((o, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", gap: 12 }}>
                      <span style={{ fontSize: 12, color: "rgba(241,245,249,0.65)" }}>{o.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#60a5fa", flexShrink: 0 }}>{o.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>
        </div>
      </section>

      {/* Flow */}
      <section id="制作の流れ" style={{ padding: "90px 40px", maxWidth: 1000, margin: "0 auto" }}>
        <Section>
          <p style={{ fontSize: 11, letterSpacing: 4, color: "#2563eb", textTransform: "uppercase", marginBottom: 10 }}>Flow</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700, marginBottom: 12, color: "#f1f5f9" }}>依頼から納品までの流れ</h2>
          <p style={{ fontSize: 14, color: "rgba(241,245,249,0.5)", marginBottom: 48 }}>はじめての方もご安心ください。丁寧にサポートします。</p>
        </Section>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {flow.map((f, i) => (
            <Section key={i} delay={i * 0.08}>
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: i === flow.length - 1 ? "rgba(34,197,94,0.15)" : "rgba(37,99,235,0.15)", border: `1px solid ${i === flow.length - 1 ? "rgba(34,197,94,0.4)" : "rgba(37,99,235,0.4)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{f.icon}</div>
                  {i < flow.length - 1 && <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(37,99,235,0.4), transparent)", margin: "4px 0" }} />}
                </div>
                <div style={{ paddingBottom: i < flow.length - 1 ? 12 : 0, paddingTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#2563eb", letterSpacing: 2 }}>{f.num}</span>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#f1f5f9" }}>{f.title}</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "rgba(241,245,249,0.55)", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* Works */}
      <section id="実績" style={{ padding: "80px 40px", background: "rgba(37,99,235,0.04)", borderTop: "1px solid rgba(37,99,235,0.1)", borderBottom: "1px solid rgba(37,99,235,0.1)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Section>
            <p style={{ fontSize: 11, letterSpacing: 4, color: "#2563eb", textTransform: "uppercase", marginBottom: 10 }}>Works</p>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700, marginBottom: 40, color: "#f1f5f9" }}>制作実績</h2>
          </Section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
            {works.map((w, i) => (
              <Section key={i} delay={i * 0.07}>
                <div style={{ borderRadius: 10, overflow: "hidden", cursor: "pointer", transition: "transform 0.25s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={{ height: 140, background: `linear-gradient(135deg, ${w.accent}22, ${w.accent}55)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: w.accent + "33", border: `1px solid ${w.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>▶</div>
                    <span style={{ position: "absolute", top: 10, right: 10, fontSize: 10, padding: "3px 8px", borderRadius: 4, background: w.accent + "44", color: "#93c5fd", fontWeight: 500 }}>{w.tag}</span>
                  </div>
                  <div style={{ padding: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderTop: "none" }}>
                    <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{w.label}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "rgba(241,245,249,0.4)" }}>{w.desc}</p>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="私たちについて" style={{ padding: "90px 40px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 60, alignItems: "center" }}>
          <Section>
            <p style={{ fontSize: 11, letterSpacing: 4, color: "#2563eb", textTransform: "uppercase", marginBottom: 10 }}>About</p>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 700, marginBottom: 20, color: "#f1f5f9", lineHeight: 1.35 }}>才能を開花させる<br />場所を作りたい</h2>
            <p style={{ fontSize: 14, color: "rgba(241,245,249,0.6)", lineHeight: 1.95, marginBottom: 16 }}>Bloomyは「開花する・集まる」をコンセプトにした造語。主婦やフリーランスのクリエイターが自分のペースで活躍できる場所を目指しています。</p>
            <p style={{ fontSize: 14, color: "rgba(241,245,249,0.6)", lineHeight: 1.95 }}>動画編集を通じて、クライアントのビジョンを映像で表現し、ブランドの価値を最大化します。</p>
          </Section>
          <Section delay={0.2}>
            <div style={{ padding: "28px 24px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(37,99,235,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,rgba(37,99,235,0.3),rgba(96,165,250,0.3))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#93c5fd", border: "1px solid rgba(37,99,235,0.35)" }}>YA</div>
                <div>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#f1f5f9" }}>吉村 愛理沙</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#60a5fa", marginTop: 3 }}>動画クリエイター / 代表</p>
                </div>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {[["専門","動画編集 / グラフィックデザイン"],["使用ツール","Pr · Ae · CapCut · Canva · 生成AI"],["拠点","日本（リモート対応可）"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 12, fontSize: 13 }}>
                    <span style={{ color: "rgba(241,245,249,0.35)", width: 64, flexShrink: 0 }}>{k}</span>
                    <span style={{ color: "rgba(241,245,249,0.75)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <section id="お問い合わせ" style={{ padding: "80px 40px", textAlign: "center", background: "rgba(37,99,235,0.06)", borderTop: "1px solid rgba(37,99,235,0.12)" }}>
        <Section>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 700, marginBottom: 12, color: "#f1f5f9" }}>まずは、気軽に相談してください。</h2>
          <p style={{ fontSize: 14, color: "rgba(241,245,249,0.55)", marginBottom: 8, lineHeight: 1.9 }}>「こんな動画作れる？」「料金の相談がしたい」</p>
          <p style={{ fontSize: 14, color: "rgba(241,245,249,0.55)", marginBottom: 36 }}>どんな小さなご質問でも大歓迎です。動画制作を通してビジネスの発信をサポートします。</p>
<a href="mailto:w.k.dsya@gmail.com" style={{ padding: "15px 36px", borderRadius: 8, background: "#2563eb", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 24px rgba(37,99,235,0.45)", textDecoration: "none", display: "inline-block" }}>w.k.dsya@gmail.com</a>        </Section>
      </section>

      {/* Footer */}
      <footer style={{ padding: "22px 40px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "rgba(241,245,249,0.4)" }}><span style={{ color: "#2563eb" }}>B</span>loomy</p>
        <p style={{ margin: 0, fontSize: 11, color: "rgba(241,245,249,0.25)" }}>© 2025 Bloomy. All rights reserved.</p>
      </footer>

    </div>
  );
}