import { useState, useEffect, useRef } from "react";
import myImg from './assets/my-img.png';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV = ["Home","About","Skills","Projects","Contact"];

const SKILLS = [
  { name:"React.js",    pct:92, color:"#61dafb" },
  { name:"Next.js",     pct:85, color:"#a78bfa" },
  { name:"Angular.js",  pct:80, color:"#f87171" },
  { name:"Node.js",     pct:82, color:"#4ade80" },
  { name:"JavaScript",  pct:90, color:"#fbbf24" },
  { name:"HTML5/CSS3",  pct:95, color:"#fb923c" },
  { name:"Bootstrap 5", pct:90, color:"#c084fc" },
  { name:"Sass/SCSS",   pct:85, color:"#f472b6" },
  { name:"jQuery",      pct:80, color:"#38bdf8" },
  { name:"Git/GitHub",  pct:88, color:"#f97316" },
  { name:"Responsive Design",  pct:95, color:"#00d4ff" },
  { name:"MongoDB", pct:90, color:"#a5b4fc" },
];

const PROJECTS = [
  { title:"GroupLandmark Website",  desc:"Corporate website with dynamic content management & modern UI/UX.",           tech:["Node.js","HTML","CSS","JS"],          color:"#00d4ff", emoji:"🏢" },
  { title:"GroupLandmark Admin",    desc:"Full admin dashboard for managing content, users & business data.",           tech:["Angular.js","Bootstrap","REST API"],  color:"#a78bfa", emoji:"⚙️" },
  { title:"GroupLandmark LIS Plus", desc:"Laboratory Information System with complex data workflows in Laravel PHP.",   tech:["Laravel","PHP","MySQL","Bootstrap"],  color:"#fb923c", emoji:"🔬" },
  { title:"Cropsolagro",            desc:"Agriculture platform with crop solutions, product listings & farmer info.",   tech:["HTML","PHP","CSS","jQuery"],          color:"#4ade80", emoji:"🌾" },
  { title:"Floson",                 desc:"Business management app with workflow automation & reporting dashboards.",     tech:["Angular.js","Bootstrap","REST API"],   color:"#f87171", emoji:"🌊" },
  { title:"Well-Service",           desc:"Service management portal with scheduling, tracking & client management.",    tech:["Angular.js","Bootstrap","REST API"],  color:"#c084fc", emoji:"🛠️" },
  { title:"Sportomic Website",      desc:"High-performance sports platform with Next.js SSR & SEO optimization.",       tech:["Next.js","React","Sass","Bootstrap"], color:"#22d3ee", emoji:"🏆" },
  { title:"Sportomic Vendor Panel", desc:"Vendor panel for sports facility owners to manage bookings & revenue.",       tech:["React.js","Redux","Bootstrap"],       color:"#fb923c", emoji:"🏪" },
  { title:"Sportomic Admin",        desc:"Admin dashboard with analytics, user management & content control.",          tech:["React.js","Redux","Chart.js"],        color:"#e879f9", emoji:"📊" },
  { title:"Jainam Tours",           desc:"Travel website with tour packages, booking system & destination showcases.",  tech:["Next.js","React","Sass","REST API"],  color:"#86efac", emoji:"✈️" },
];

const SOCIALS = [
  { icon:"🐙", label:"GitHub",   href:"https://github.com/Jaimin2203" },
  { icon:"💼", label:"LinkedIn", href:"https://www.linkedin.com/in/jaymin-chauhan-724aa8255" },
  { icon:"📧", label:"Email",    href:"mailto:jayminchahun6667@gmail.com" },
];

const EMAILJS_SERVICE_ID  = "service_7yzdzvt";
const EMAILJS_TEMPLATE_ID = "template_40e390r";
const EMAILJS_PUBLIC_KEY  = "5yxxJdkTtWVmPDPtw";

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useInView(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

// ─── ANIMATED MESH BACKGROUND ─────────────────────────────────────────────────
function MeshBg() {
  const c = useRef(null);
  useEffect(() => {
    const canvas = c.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const colors = ["rgba(124,58,237,","rgba(0,212,255,","rgba(168,85,247,","rgba(6,182,212,"];
    const pts = Array.from({ length: 5 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 220 + 160,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    let af;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -p.r || p.x > W + p.r) p.vx *= -1;
        if (p.y < -p.r || p.y > H + p.r) p.vy *= -1;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, p.color + "0.18)"); g.addColorStop(1, p.color + "0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      af = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(af); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={c} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none", opacity: 0.65 }} />;
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────────
function SkillBar({ name, pct, color, delay }) {
  const [ref, v] = useInView(0.05);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: `all 0.5s ease ${delay}s` }}>
      <div 
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: "18px 26px",
          borderRadius: 14,
          background: hov ? `${color}12` : "rgba(255,255,255,0.04)",
          border: hov ? `1.5px solid ${color}44` : `1.5px solid rgba(255,255,255,0.12)`,
          fontFamily: "'DM Mono',monospace",
          fontSize: 14,
          fontWeight: 600,
          color: hov ? color : "#e2e8f0",
          textAlign: "center",
          cursor: "pointer",
          transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`,
          backdropFilter: "blur(8px)",
          transform: hov ? "translateY(-6px) scale(1.05)" : "translateY(0) scale(1)",
          boxShadow: hov ? `0 12px 28px ${color}22` : "none",
        }}>
        {name}
      </div>
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ p, i }) {
  const [ref, v] = useInView(0.04);
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({x:0, y:0});
  return (
    <div ref={ref} className={`h-100 project-card ${v ? (i % 2 === 0 ? 'fade-in-up' : 'fade-in-left') : ''}`} 
      onMouseEnter={() => setHov(true)} 
      onMouseLeave={() => { setHov(false); setTilt({x:0,y:0}); }}
      onMouseMove={(e) => { 
        const rect = e.currentTarget.getBoundingClientRect(); 
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; 
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20; 
        setTilt({x, y}); 
      }}
      style={{
        background: hov ? `${p.color}08` : "rgba(255,255,255,0.03)",
        border: `1.5px solid ${hov ? p.color + "44" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 20, padding: "28px 24px",
        transition: `background 0.35s ease, border 0.35s ease, box-shadow 0.35s ease`,
        boxShadow: hov ? `0 20px 60px ${p.color}24, inset 0 1px 0 ${p.color}12` : "0 4px 12px rgba(0,0,0,0.2)",
        backdropFilter: "blur(16px)", cursor: "pointer",
        display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) ${hov ? 'translateY(-8px) scale(1.02)' : ''}`,
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease, background 0.35s ease, border 0.35s ease, box-shadow 0.35s ease",
        animationDelay: `${i * 0.15}s`,
      }}>
      {/* Glow effect */}
      <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: p.color, filter: "blur(50px)", opacity: hov ? 0.15 : 0, transition: "opacity 0.5s ease", pointerEvents: "none", animation: hov ? "pulse 1s infinite" : "none" }} />
      
      {/* Emoji */}
      <div style={{ fontSize: 32, marginBottom: 16, transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)", animation: hov ? "emojiHover 0.6s ease" : "none" }}>{p.emoji}</div>
      
      {/* Title */}
      <h6 style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, color: hov ? p.color : "#f1f5f9", marginBottom: 10, fontSize: 17, transition: "color 0.3s ease", letterSpacing: -0.5 }}>{p.title}</h6>
      
      {/* Description */}
      <p style={{ color: hov ? "#94a3b8" : "#64748b", fontSize: 13.5, lineHeight: 1.75, flexGrow: 1, marginBottom: 18, transition: "color 0.3s ease" }}>{p.desc}</p>
      
      {/* Tech tags */}
      <div className="d-flex flex-wrap gap-2">
        {p.tech.map((t, idx) => (
          <span key={t} style={{ 
            padding: "4px 12px", borderRadius: 20, background: `${p.color}12`, color: p.color, 
            fontSize: 11, fontFamily: "'DM Mono',monospace", border: `1px solid ${p.color}28`,
            transition: `all 0.3s ease ${idx * 0.05}s`,
            transform: hov ? "translateY(-2px) scale(1.05)" : "translateY(0) scale(1)",
            fontWeight: 500, letterSpacing: 0.3,
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [form, setForm] = useState({ name: "", email: "", title: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const [filter, setFilter] = useState("All");

  const roles = ["Frontend Developer", "React.js Developer", "Next.js Developer", "Angular.js Developer", "UI/UX Enthusiast"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout;
    const currentRole = roles[roleIdx];
    if (!isDeleting && charIdx < currentRole.length) {
      typingTimeout = setTimeout(() => {
        setTyped(currentRole.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 70);
    } else if (!isDeleting && charIdx === currentRole.length) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1700);
    } else if (isDeleting && charIdx > 0) {
      typingTimeout = setTimeout(() => {
        setTyped(currentRole.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, 40);
    } else if (isDeleting && charIdx === 0) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIdx((roleIdx + 1) % roles.length);
      }, 400);
    }
    return () => clearTimeout(typingTimeout);
  }, [charIdx, isDeleting, roleIdx, roles]);

  // Scroll
  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 50);
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].toLowerCase());
        if (el && el.getBoundingClientRect().top <= 100) { setActive(NAV[i]); break; }
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = id => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setActive(id); setMenuOpen(false); };

  // EmailJS submit
  const submit = async e => {
    e.preventDefault(); setSending(true); setErr("");
    const load = () => new Promise((res, rej) => {
      if (window.emailjs) return res();
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
      s.onload = () => { window.emailjs.init(EMAILJS_PUBLIC_KEY); res(); };
      s.onerror = rej;
      document.head.appendChild(s);
    });
    try {
      await load();
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { name: form.name, email: form.email, message: form.message || "Portfolio Contact" });
      setSent(true); setForm({ name: "", email: "", message: "" });
    } catch {
      setErr("Opening mail app...");
      setTimeout(() => { const s = encodeURIComponent("Portfolio Enquiry from " + form.name); const b = encodeURIComponent("Name: " + form.name + "\nEmail: " + form.email + "\n\nMessage:\n" + form.message); window.open("mailto:jayminchahun6667@gmail.com?subject=" + s + "&body=" + b); }, 800);
    } finally { setSending(false); setTimeout(() => { setSent(false); setErr(""); }, 6000); }
  };

  const [aRef, aV] = useInView();
  const [cRef, cV] = useInView();

  const FILTERS = ["All", "React.js", "Next.js", "Angular.js", "Node.js", "PHP"];
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.tech.some(t => t.toLowerCase().includes(filter.toLowerCase().split(".")[0])));

  return (
    <>
      {/* Bootstrap CSS */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

        html, body {
          background: #030712 !important;
          overflow-x: hidden !important;
          scroll-behavior: smooth;
          font-family: 'DM Sans', sans-serif !important;
        }
        * { box-sizing: border-box; }
        ::selection { background: linear-gradient(135deg,rgba(124,58,237,0.6),rgba(0,212,255,0.6)); color: #fff; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #7c3aed, #00d4ff); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #a78bfa, #06b6d4); }
        input, textarea { outline: none !important; background: rgba(255,255,255,0.04) !important; border: 1.5px solid rgba(255,255,255,0.1) !important; color: #f1f5f9 !important; border-radius: 12px !important; font-family: 'DM Sans',sans-serif !important; transition: all 0.3s !important; }
        input::placeholder, textarea::placeholder { color: #64748b !important; }
        input:focus, textarea:focus { background: rgba(255,255,255,0.08) !important; border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.2) !important; }
        
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes fadeUp { 0%{opacity:0;transform:translateY(30px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes fadeInLeft { 0%{opacity:0;transform:translateX(-30px)} 100%{opacity:1;transform:translateX(0)} }
        @keyframes fadeInRight { 0%{opacity:0;transform:translateX(30px)} 100%{opacity:1;transform:translateX(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes glow { 0%,100%{opacity:0.5;filter:drop-shadow(0 0 8px currentColor)} 50%{opacity:1;filter:drop-shadow(0 0 16px currentColor)} }
        @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-16px)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes slideDown { 0%{opacity:0;transform:translateY(-12px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes bounceIn { 0%{opacity:0;transform:scale(0.95)} 100%{opacity:1;transform:scale(1)} }

        .nav-btn { 
          background: none; border: none; cursor: pointer; font-family: 'DM Mono',monospace; font-size: 12px; padding: 8px 16px; 
          border-radius: 30px; transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); color: #64748b; position: relative; 
          font-weight: 500; letter-spacing: 0.5px;
        }
        .nav-btn:hover { color: #fff; background: rgba(255,255,255,0.12); transform: translateY(-2px); }
        .nav-btn.active { color: #c4b5fd; background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3); }
        
        .filter-btn { 
          cursor: pointer; font-family: 'DM Mono',monospace; font-size: 12px; padding: 8px 20px; 
          border-radius: 24px; border: 1.5px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); 
          color: #475569; transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); backdrop-filter: blur(8px); 
          font-weight: 500; letter-spacing: 0.5px;
        }
        .filter-btn:hover { 
          border-color: rgba(255,255,255,0.3); color: #e2e8f0; background: rgba(255,255,255,0.08); 
          transform: translateY(-3px); box-shadow: 0 8px 16px rgba(255,255,255,0.1);
        }
        .filter-btn.active { 
          border-color: rgba(124,58,237,0.8); background: rgba(124,58,237,0.2); color: #c4b5fd; 
          box-shadow: 0 0 20px rgba(124,58,237,0.3);
        }
        
        .social-link { 
          display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: 10px; 
          background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.1); color: #475569; 
          text-decoration: none; font-size: 13px; font-family: 'DM Mono',monospace; 
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); backdrop-filter: blur(8px); font-weight: 500;
        }
        .social-link:hover { 
          border-color: #00d4ff; color: #00d4ff; transform: translateY(-4px) scale(1.05); 
          box-shadow: 0 8px 20px rgba(0,212,255,0.2);
        }
        
        .btn-primary-custom { 
          background: linear-gradient(135deg, #7c3aed, #06b6d4); border: none; color: #fff; 
          font-family: 'DM Mono',monospace; font-size: 13px; font-weight: 600; padding: 13px 30px; 
          border-radius: 12px; cursor: pointer; box-shadow: 0 8px 28px rgba(124,58,237,0.35); 
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative; overflow: hidden;
          letter-spacing: 0.5px;
        }
        .btn-primary-custom:hover { 
          transform: translateY(-4px); box-shadow: 0 14px 40px rgba(124,58,237,0.5); 
          background: linear-gradient(135deg, #8d47e3, #12b5d8);
        }
        .btn-primary-custom:active { transform: translateY(-2px); }
        
        .btn-outline-custom { 
          background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.15); color: #94a3b8; 
          font-family: 'DM Mono',monospace; font-size: 13px; padding: 12px 28px; border-radius: 12px; 
          cursor: pointer; backdrop-filter: blur(8px); transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); 
          font-weight: 500; letter-spacing: 0.5px;
        }
        .btn-outline-custom:hover { 
          background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.3); color: #fff; 
          transform: translateY(-3px); box-shadow: 0 8px 20px rgba(255,255,255,0.1);
        }
        
        .glass-card { 
          background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.08); 
          border-radius: 20px; backdrop-filter: blur(20px); transition: all 0.35s ease; 
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .glass-card:hover { 
          background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); 
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
        
        .project-card { opacity: 0; }
        .fade-in-up { animation: fadeUp 0.8s ease both; }
        .fade-in-left { animation: fadeInLeft 0.8s ease both; }
        
        @keyframes emojiHover { 
          0% { transform: scale(1) rotate(0deg); } 
          25% { transform: scale(1.1) rotate(2deg); } 
          50% { transform: scale(1.3) rotate(10deg); } 
          75% { transform: scale(1.25) rotate(6deg); } 
          100% { transform: scale(1.2) rotate(8deg); } 
        }
        
        .section-badge { 
          display: inline-block; padding: 6px 16px; border-radius: 24px; font-family: 'DM Mono',monospace; 
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;
          animation: bounceIn 0.6s ease;
        }
        
        .gradient-text { 
          background: linear-gradient(135deg,#c4b5fd,#67e8f9); 
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; 
        }
        
        .contact-info-item { 
          display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: 14px; 
          background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.08); 
          margin-bottom: 14px; transition: all 0.35s ease;
        }
        .contact-info-item:hover { 
          background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); 
          transform: translateX(4px);
        }
        
        .contact-icon { 
          width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; 
          justify-content: center; font-size: 18px; flex-shrink: 0; 
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .contact-info-item:hover .contact-icon { 
          transform: scale(1.1) rotate(6deg);
        }
        
        /* Responsive Design */
        @media (max-width: 1200px) {
          .hero-title { font-size: clamp(32px, 5vw, 72px) !important; }
          .section-title { font-size: clamp(24px, 4vw, 48px) !important; }
        }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 36px !important; }
          .section-title { font-size: 28px !important; }
          .filter-btn { padding: 6px 16px; font-size: 11px; }
          .nav-btn { padding: 6px 12px; font-size: 11px; }
          .btn-primary-custom { padding: 11px 24px; font-size: 12px; }
          .btn-outline-custom { padding: 10px 20px; font-size: 12px; }
        }
        
        @media (max-width: 576px) {
          .hero-title { font-size: 28px !important; }
          .section-title { font-size: 22px !important; }
          .social-link { padding: 7px 14px; font-size: 12px; gap: 5px; }
          .contact-info-item { padding: 12px 14px; gap: 10px; }
        }
      `}</style>

      <div style={{ background: "#030712", minHeight: "100vh", color: "#f1f5f9", position: "relative" }}>
        <MeshBg />

        {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, width: "100%",
          background: scrolled || menuOpen ? "rgba(3,7,18,0.92)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(28px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.4s ease",
        }}>
          <div className="container-fluid px-4 px-lg-5">
            <div className="d-flex align-items-center justify-content-between" style={{ height: 70 }}>

              {/* Logo */}
              <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => go("Home")}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", flexShrink: 0 }}>JC</div>
                <span className="d-none d-md-block" style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 600, fontSize: 18, color: "#f1f5f9" }}>Jaymin Chauhan</span>
              </div>

              {/* Desktop Nav */}
              <div className="d-none d-lg-flex align-items-center gap-1" style={{ background: "rgba(255,255,255,0.04)", borderRadius: 40, padding: "6px 8px", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
                {NAV.map(l => (
                  <button key={l} className={`nav-btn${active === l ? " active" : ""}`} onClick={() => go(l)}>{l}</button>
                ))}
              </div>

              {/* Right side */}
              <div className="d-flex align-items-center gap-3">
                <button className="d-none d-lg-block btn-outline-custom" style={{ padding: "8px 20px", fontSize: 12 }} onClick={() => go("Contact")}>Let's Talk →</button>

                {/* Hamburger */}
                <button className="d-lg-none" onClick={() => setMenuOpen(o => !o)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 12px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5 }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ display: "block", width: 20, height: 2, background: "#e2e8f0", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
                  ))}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 0 20px", animation: "slideDown 0.25s ease" }}>
                {NAV.map(l => (
                  <button key={l} onClick={() => go(l)} style={{ display: "block", width: "100%", textAlign: "left", padding: "13px 16px", marginBottom: 4, borderRadius: 12, background: active === l ? "rgba(124,58,237,0.15)" : "transparent", border: active === l ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent", color: active === l ? "#c4b5fd" : "#64748b", fontFamily: "'DM Mono',monospace", fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>{l}</button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section id="home" className="d-flex align-items-center" style={{ minHeight: "100vh", position: "relative", zIndex: 2, paddingTop: 70 }}>
          <div className="container-fluid px-4 px-lg-5">
            <div className="row align-items-center gy-4">
              <div className="col-12 col-lg-6 col-xl-5" style={{ animation: "fadeUp 0.9s ease both" }}>

                {/* Status badge */}
                <div className="d-inline-flex align-items-center gap-2 mb-4" style={{ padding: "6px 16px", borderRadius: 30, background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)", backdropFilter: "blur(8px)" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00d4ff", display: "inline-block", boxShadow: "0 0 8px #00d4ff", animation: "glow 2s ease infinite" }} />
                  <span style={{ color: "#67e8f9", fontFamily: "'DM Mono',monospace", fontSize: 12 }}>Open to Freelance · Ahmedabad, IN</span>
                </div>

                {/* Name */}
                <h1 className="hero-title mb-3" style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: "clamp(40px,6vw,70px)", lineHeight: 1.05, letterSpacing: -2 }}>
                  <span className="d-block mb-1" style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.5em", letterSpacing: 4, fontFamily: "'DM Mono',monospace", fontWeight: 400 }}>HELLO, I'M</span>
                  <span style={{ background: "linear-gradient(135deg,#fff 0%,#c4b5fd 45%,#67e8f9 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 5s linear infinite" }}>Jaymin Chauhan</span>
                </h1>

                {/* Typed */}
                <div className="mb-3" style={{ fontFamily: "'DM Mono',monospace", fontSize: "clamp(14px,2vw,20px)", color: "rgba(255,255,255,0.3)", minHeight: 32 }}>
                  <span style={{ color: "#c4b5fd" }}>{typed}</span>
                  <span style={{ animation: "blink 1s infinite", color: "#7c3aed" }}>|</span>
                </div>

                {/* Bio */}
                <p className="mb-2" style={{ color: "#475569", fontSize: 16, lineHeight: 1.85, maxWidth: 560 }}>
                  <strong style={{ color: "#94a3b8" }}>1.8 years</strong> professional experience at{" "}
                  <span style={{ color: "#c4b5fd", fontFamily: "'DM Mono',monospace" }}>Ivotiontech</span>.
                  {" "}I build fast, pixel-perfect web apps using React, Next.js & Angular.
                </p>
                <p className="mb-4" style={{ color: "#334155", fontFamily: "'DM Mono',monospace", fontSize: 12 }}>
                  10 shipped projects &nbsp;·&nbsp; 2+ years total XP &nbsp;·&nbsp; Ahmedabad, Gujarat
                </p>

                {/* Buttons */}
                <div className="d-flex flex-wrap gap-3 mb-4">
                  <button className="btn-primary-custom" onClick={() => go("Projects")}>View Projects →</button>
                  <button className="btn-outline-custom" onClick={() => go("Contact")}>Hire Me</button>
                </div>

                {/* Social */}
                <div className="d-flex flex-wrap gap-2">
                  {SOCIALS.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-link">
                      <span style={{ fontSize: 15 }}>{s.icon}</span> {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Profile Image */}
              <div className="col-12 col-lg-6 col-xl-7 d-flex justify-content-center align-items-center" style={{ animation: "fadeUp 0.9s ease both", animationDelay: "0.1s" }}>
                <div style={{ position: "relative", width: "clamp(250px, 80vw, 380px)", aspectRatio: "1" }}>
                  {/* Animated rings */}
                  <div style={{ position: "absolute", inset: -20, borderRadius: "50%", border: "2px solid rgba(124,58,237,0.3)", animation: "spin 20s linear infinite" }} />
                  <div style={{ position: "absolute", inset: -40, borderRadius: "50%", border: "1px dashed rgba(0,212,255,0.2)", animation: "spin 14s linear infinite reverse" }} />
                  
                  {/* Profile Image Container */}
                  <div style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 40% 40%, rgba(124,58,237,0.2), rgba(6,182,212,0.1), rgba(3,7,18,0.8))",
                    border: "2px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 25px 50px rgba(124,58,237,0.2)",
                  }}>
                    {/* Profile Image */}
                    <img 
                      src={myImg} 
                      alt="Jaymin Chauhan" 
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: "28px",
                        display: "block",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 120px; animation: float 6s ease-in-out infinite;">👨‍💻</div>';
                      }}
                    />
                  </div>

                  {/* Floating badges */}
                  {/* {[
                    { text: "React Expert", pos: { top: "-15px", right: "-15px" }, color: "#61dafb" },
                    { text: "UI/UX Focus", pos: { bottom: "-15px", left: "-15px" }, color: "#00d4ff" },
                    { text: "Next.js Pro", pos: { bottom: "-15px", right: "-15px" }, color: "#a78bfa" },
                  ].map(({ text, pos, color }) => (
                    <div key={text} style={{
                      position: "absolute",
                      ...pos,
                      background: `${color}12`,
                      border: `1.5px solid ${color}44`,
                      borderRadius: 12,
                      padding: "10px 16px",
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 11,
                      color: color,
                      whiteSpace: "nowrap",
                      backdropFilter: "blur(12px)",
                      animation: "float 6s ease-in-out infinite",
                    }}>
                      {text}
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────────────────────── */}
        <section id="about" style={{ position: "relative", zIndex: 2, background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "100px 0" }}>
          <div className="container-fluid px-4 px-lg-5">
            <div ref={aRef} className="row align-items-center gy-5" style={{ opacity: aV ? 1 : 0, transform: aV ? "translateY(0)" : "translateY(32px)", transition: "all 0.9s ease" }}>

              {/* Text */}
              <div className="col-12 col-lg-6">
                <div className="section-badge mb-4" style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", color: "#c4b5fd" }}>About Me</div>
                <h2 className="section-title mb-4" style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.1, letterSpacing: -1 }}>
                  Building Interfaces<br />
                  <span className="gradient-text">That Feel Alive</span>
                </h2>
                <p className="mb-3" style={{ color: "#475569", lineHeight: 1.9, fontSize: 15 }}>
                  I'm <strong style={{ color: "#e2e8f0" }}>Jaymin Chauhan</strong>, a frontend developer from Ahmedabad, Gujarat, specialising in crafting responsive, high-performance interfaces with React, Next.js and Angular.
                </p>
                <p className="mb-3" style={{ color: "#475569", lineHeight: 1.9, fontSize: 15 }}>
                  Started with a <strong style={{ color: "#67e8f9" }}>9-month internship at Think Tank</strong>, then joined Ivotiontech for a 4-month internship before growing into <strong style={{ color: "#67e8f9" }}>1.8 years of full-time work</strong> — shipping 10 production projects along the way.
                </p>
                <p className="mb-4" style={{ color: "#475569", lineHeight: 1.9, fontSize: 15 }}>
                  I care deeply about clean code, micro-interactions, and experiences that delight users at every pixel.
                </p>

                {/* Stats */}
                <div className="row g-3">
                  {[["10+","Projects","🎯"],["1.8yr","Ivotiontech","🏢"],["9mo","Think Tank","🧠"],["∞","Passion","🔥"]].map(([v, l, ic]) => (
                    <div key={l} className="col-6 col-sm-3">
                      <div className="glass-card text-center p-3">
                        <div style={{ fontSize: 22, marginBottom: 6 }}>{ic}</div>
                        <div className="gradient-text" style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: 22 }}>{v}</div>
                        <div style={{ color: "#334155", fontSize: 10, fontFamily: "'DM Mono',monospace", marginTop: 3 }}>{l}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avatar */}
              <div className="col-12 col-lg-6 d-flex justify-content-center">
                <div style={{ position: "relative", width: 280, height: 280 }}>
                  <div style={{ position: "absolute", inset: -14, borderRadius: "50%", border: "1px dashed rgba(124,58,237,0.3)", animation: "spin 20s linear infinite" }} />
                  <div style={{ position: "absolute", inset: -7, borderRadius: "50%", border: "1px dashed rgba(0,212,255,0.2)", animation: "spin 14s linear infinite reverse" }} />
                  <div className="w-100 h-100" style={{ borderRadius: "50%", background: "radial-gradient(circle at 40% 40%,rgba(124,58,237,0.2),rgba(6,182,212,0.1),rgba(3,7,18,0.8))", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100, animation: "float 6s ease-in-out infinite", backdropFilter: "blur(20px)" }}>
                    👨‍💻
                  </div>
                  {[
                    { text: "React.js", bg: "rgba(97,218,251,0.12)", bc: "rgba(97,218,251,0.35)", c: "#61dafb", s: { top: -14, right: -14 } },
                    { text: "Next.js",  bg: "rgba(255,255,255,0.07)", bc: "rgba(255,255,255,0.2)",  c: "#fff",    s: { bottom: -14, left: -14 } },
                    { text: "Angular",  bg: "rgba(248,113,113,0.12)", bc: "rgba(248,113,113,0.35)", c: "#f87171", s: { top: "42%",  right: -52 } },
                  ].map(({ text, bg, bc, c, s }) => (
                    <div key={text} style={{ position: "absolute", ...s, background: bg, border: `1px solid ${bc}`, borderRadius: 10, padding: "8px 14px", fontFamily: "'DM Mono',monospace", fontSize: 11, color: c, whiteSpace: "nowrap", backdropFilter: "blur(12px)" }}>{text}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ──────────────────────────────────────────────────────── */}
        <section id="skills" style={{ position: "relative", zIndex: 2, padding: "100px 0" }}>
          <div className="container-fluid px-4 px-lg-5">
            <div className="text-center mb-5">
              <div className="section-badge mb-3" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)", color: "#67e8f9" }}>Expertise</div>
              <h2 className="section-title" style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,48px)", letterSpacing: -1 }}>
                Skills & <span className="gradient-text">Technologies</span>
              </h2>
            </div>
            <div className="row g-4">
              {SKILLS.map((s, i) => (
                <div key={s.name} className="col-12 col-md-6 col-lg-4">
                  <SkillBar {...s} delay={i * 0.06} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ────────────────────────────────────────────────────── */}
        <section id="projects" style={{ position: "relative", zIndex: 2, background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "100px 0" }}>
          <div className="container-fluid px-4 px-lg-5">
            <div className="text-center mb-4">
              <div className="section-badge mb-3" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)", color: "#c4b5fd" }}>Portfolio</div>
              <h2 className="section-title mb-2" style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,48px)", letterSpacing: -1 }}>
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p style={{ color: "#334155", fontFamily: "'DM Mono',monospace", fontSize: 12 }}>
                All 10 built at <span style={{ color: "#c4b5fd" }}>Ivotiontech</span>
              </p>
            </div>

            {/* Filters */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
              {FILTERS.map(f => (
                <button key={f} className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>

            <div className="row g-4">
              {shown.map((p, i) => (
                <div key={p.title} className="col-12 col-md-6 col-lg-4" style={{ position: "relative" }}>
                  <ProjectCard p={p} i={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────────────────────────────── */}
        <section id="contact" style={{ position: "relative", zIndex: 2, padding: "100px 0" }}>
          <div className="container-fluid px-4 px-lg-5">
            <div className="text-center mb-5">
              <div className="section-badge mb-3" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#67e8f9" }}>Contact</div>
              <h2 className="section-title mb-2" style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,48px)", letterSpacing: -1 }}>
                Let's Build <span className="gradient-text">Something</span>
              </h2>
              <p style={{ color: "#475569", fontSize: 15, maxWidth: 440, margin: "0 auto" }}>
                Got a project? Drop a message and I'll reply within 24 hours.
              </p>
            </div>

            <div ref={cRef} className="row g-4" style={{ opacity: cV ? 1 : 0, transform: cV ? "translateY(0)" : "translateY(28px)", transition: "all 0.9s ease" }}>

              {/* Left — Info */}
              <div className="col-12 col-lg-5">
                <div className="glass-card p-4 p-lg-5 mb-4">
                  <h5 style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 600, color: "#f1f5f9", marginBottom: 8 }}>Contact Details</h5>
                  <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.8, marginBottom: 24 }}>Fill the form and I'll get back to you within 24 hours!</p>

                  {[
                    { icon: "📧", label: "Email",     val: "jayminchahun6667@gmail.com", href: "mailto:jayminchahun6667@gmail.com", color: "#67e8f9" },
                    { icon: "📍", label: "Location",  val: "Ahmedabad, Gujarat, India",  href: null, color: "#c4b5fd" },
                    { icon: "⏰", label: "Response",  val: "Within 24 hours",            href: null, color: "#4ade80" },
                  ].map(({ icon, label, val, href, color }) => (
                    <div key={label} className="contact-info-item">
                      <div className="contact-icon" style={{ background: `${color}12`, border: `1px solid ${color}28` }}>{icon}</div>
                      <div>
                        <div style={{ color: "#334155", fontFamily: "'DM Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{label}</div>
                        {href
                          ? <a href={href} style={{ color, fontSize: 13, textDecoration: "none", fontWeight: 500, wordBreak: "break-all" }}>{val}</a>
                          : <div style={{ color: "#94a3b8", fontSize: 13 }}>{val}</div>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="glass-card p-4">
                  <p style={{ color: "#334155", fontFamily: "'DM Mono',monospace", fontSize: 11, marginBottom: 14 }}>FIND ME ON</p>
                  <div className="d-flex flex-wrap gap-2">
                    {SOCIALS.map(s => (
                      <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-link">
                        <span style={{ fontSize: 14 }}>{s.icon}</span> {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — Form */}
              <div className="col-12 col-lg-7">
                <div className="glass-card p-4 p-lg-5">
                  {sent && (
                    <div className="d-flex align-items-center gap-3 mb-4 p-3" style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 12, color: "#4ade80", fontFamily: "'DM Mono',monospace", fontSize: 13 }}>
                      <span style={{ fontSize: 22 }}>✅</span>
                      <div><div style={{ fontWeight: 600, marginBottom: 2 }}>Message Sent!</div><div style={{ opacity: 0.7, fontSize: 11 }}>I'll reply within 24 hours.</div></div>
                    </div>
                  )}
                  {err && <div className="mb-3 p-3" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 12, color: "#f87171", fontSize: 13, fontFamily: "'DM Mono',monospace" }}>⚠️ {err}</div>}

                  <form onSubmit={submit}>
                    <div className="row g-3 mb-3">
                      <div className="col-12 col-sm-6">
                        <label style={{ display: "block", color: "#64748b", fontFamily: "'DM Mono',monospace", fontSize: 11, marginBottom: 7, textTransform: "uppercase", letterSpacing: 1.5 }}>Your Name *</label>
                        <input type="text" className="form-control" placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: "12px 15px" }} />
                      </div>
                      <div className="col-12 col-sm-6">
                        <label style={{ display: "block", color: "#64748b", fontFamily: "'DM Mono',monospace", fontSize: 11, marginBottom: 7, textTransform: "uppercase", letterSpacing: 1.5 }}>Email Address *</label>
                        <input type="email" className="form-control" placeholder="you@example.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ padding: "12px 15px" }} />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label style={{ display: "block", color: "#64748b", fontFamily: "'DM Mono',monospace", fontSize: 11, marginBottom: 7, textTransform: "uppercase", letterSpacing: 1.5 }}>Message *</label>
                      <textarea className="form-control" placeholder="Tell me about your project, goals & timeline..." required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ padding: "12px 15px", resize: "vertical" }} />
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2" style={{ padding: "14px", fontSize: 14, opacity: sending ? 0.6 : 1, cursor: sending ? "not-allowed" : "pointer" }}>
                      {sending ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} /> Sending...</> : "Send Message 🚀"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer style={{ position: "relative", zIndex: 2, background: "rgba(3,7,18,0.8)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)", width: "100%" }}>
          <div className="container-fluid px-4 px-lg-5 py-4">
            <div className="row align-items-center gy-3">
              <div className="col-12 col-md-4 d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#7c3aed,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff" }}>JC</div>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#334155" }}>Jaymin Chauhan</span>
              </div>
              <div className="col-12 col-md-4 text-center justify-content-center justify-content-md-center">
                <p style={{ color: "#1e293b", fontFamily: "'DM Mono',monospace", fontSize: 12, margin: 0 }}>
                  Crafted with <span style={{ color: "#f87171" }}>♥</span> by <span style={{ color: "#c4b5fd" }}>Jaymin Chauhan</span> · {new Date().getFullYear()}
                </p>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-md-end justify-content-center gap-3">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ color: "#1e293b", fontSize: 18, textDecoration: "none", transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#c4b5fd"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#1e293b"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
