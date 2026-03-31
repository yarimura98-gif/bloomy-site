import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { id: "all", label: "すべて" },
  { id: "business", label: "ビジネス動画" },
  { id: "reel", label: "リール・ショート" },
  { id: "event", label: "イベント・オープニング" },
  { id: "pr", label: "店舗紹介・企業PR" },
  { id: "variety", label: "バラエティー風" },
];

// ↓ここにYouTube動画IDを追加してね！
// YouTubeのURLが https://www.youtube.com/watch?v=XXXXXXXXXXX の場合
// id: "XXXXXXXXXXX" の部分に入れる
const works = [
  {
    id: "dQw4w9WgXcQ", // ← ここをYouTubeのIDに変更してね
    title: "ビジネス動画サンプル",
    category: "business",
    desc: "オンライン講座の編集実績",
  },
  {
    id: "dQw4w9WgXcQ", // ← ここをYouTubeのIDに変更してね
    title: "リール動画サンプル",
    category: "reel",
    desc: "Instagram Reels編集実績",
  },
  {
    id: "dQw4w9WgXcQ", // ← ここをYouTubeのIDに変更してね
    title: "イベントオープニング",
    category: "event",
    desc: "イベント用オープニング映像",
  },
  {
    id: "dQw4w9WgXcQ", // ← ここをYouTubeのIDに変更してね
    title: "店舗紹介動画",
    category: "pr",
    desc: "店舗PR動画の編集実績",
  },
  {
    id: "dQw4w9WgXcQ", // ← ここをYouTubeのIDに変更してね
    title: "バラエティー風動画",
    category: "variety",
    desc: "テンポよく楽しい動画編集",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [playingId, setPlayingId] = useState(null);

  const filtered = activeCategory === "all"
    ? works
    : works.filter(w => w.category === activeCategory);

  return (
    <div translate="no" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: "#070d1a", color: "#f1f5f9", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 40px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(7,13,26,0.96)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(37,99,235,0.15)" }}>
        <Link to="/" style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", letterSpacing: 1, textDecoration: "none" }}>
          <span style={{ color: "#2563eb" }}>B</span>loomy
        </Link>
        <Link to="/" style={{ color: "rgba(241,245,249,0.55)", textDecoration: "none", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
          ← トップページへ
        </Link>
      </nav>

      {/* Header */}
      <div style={{ paddingTop: 100, paddingBottom: 40, paddingLeft: 40, paddingRight: 40, maxWidth: 1000, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: 4, color: "#2563eb", textTransform: "uppercase", marginBottom: 10 }}>Portfolio</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#f1f5f9", marginBottom: 12 }}>制作実績</h1>
        <p style={{ fontSize: 14, color: "rgba(241,245,249,0.5)", lineHeight: 1.8 }}>
          これまでに制作した動画の一部をご紹介します。<br />ジャンルを選んで絞り込みができます。
        </p>
      </div>

      {/* Category tabs */}
      <div style={{ paddingLeft: 40, paddingRight: 40, maxWidth: 1000, margin: "0 auto", marginBottom: 40 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setPlayingId(null); }}
              style={{
                padding: "8px 18px",
                borderRadius: 20,
                border: activeCategory === cat.id ? "1px solid rgba(37,99,235,0.6)" : "1px solid rgba(255,255,255,0.12)",
                background: activeCategory === cat.id ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                color: activeCategory === cat.id ? "#93c5fd" : "rgba(241,245,249,0.5)",
                fontSize: 13,
                fontWeight: activeCategory === cat.id ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Works grid */}
      <div style={{ paddingLeft: 40, paddingRight: 40, maxWidth: 1000, margin: "0 auto", paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {filtered.map((work, i) => (
            <div key={i} style={{ borderRadius: 12, overflow: "hidden", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", transition: "transform 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              {/* YouTube embed */}
              <div style={{ position: "relative", paddingTop: "56.25%", background: "#050a14" }}>
                {playingId === `${work.id}-${i}` ? (
                  <iframe
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    src={`https://www.youtube.com/embed/${work.id}?autoplay=1`}
                    title={work.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    onClick={() => setPlayingId(`${work.id}-${i}`)}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${work.id}/mqdefault.jpg`}
                      alt={work.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", width: 52, height: 52, borderRadius: "50%", background: "rgba(37,99,235,0.85)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>▶</div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{work.title}</p>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: "rgba(37,99,235,0.2)", color: "#93c5fd", flexShrink: 0, marginLeft: 8 }}>
                    {categories.find(c => c.id === work.category)?.label}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(241,245,249,0.4)" }}>{work.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(241,245,249,0.3)", fontSize: 14 }}>
            このカテゴリの実績はまだありません
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ borderTop: "1px solid rgba(37,99,235,0.1)", padding: "60px 40px", textAlign: "center", background: "rgba(37,99,235,0.04)" }}>
        <p style={{ fontSize: 14, color: "rgba(241,245,249,0.5)", marginBottom: 20 }}>動画制作のご依頼・ご相談はこちら</p>
        <a href="mailto:w.k.dsya@gmail.com" style={{ padding: "13px 32px", borderRadius: 8, background: "#2563eb", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600, display: "inline-block" }}>
          w.k.dsya@gmail.com
        </a>
      </div>

    </div>
  );
}
