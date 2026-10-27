"use client";

import { useMemo, useState } from "react";
import { BookOpen, Check, ChevronRight, Clipboard, Code2, Download, FileCode2, FolderGit2, LayoutDashboard, Menu, Search, Sparkles, X } from "lucide-react";
import sourceData from "../public/programs.json";

type Program = {
  id: string;
  number: string;
  title: string;
  filename: string;
  kind: "python" | "notebook";
  code: string;
  verified: boolean;
  note: string;
  cells: { index: number; source: string }[];
};

const programs = sourceData.programs as Program[];
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "All Programs", icon: Code2 },
  { label: "Notebooks", icon: BookOpen },
  { label: "About", icon: Sparkles }
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(programs[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const selected = programs.find((program) => program.id === selectedId) ?? programs[0];
  const filtered = useMemo(() => programs.filter((program) =>
    `${program.title} ${program.filename} ${program.number}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  function chooseNav(label: string) {
    setActiveNav(label);
    setMobileOpen(false);
    if (label === "Notebooks") setQuery(".ipynb");
    else if (label === "All Programs" || label === "Dashboard") setQuery("");
  }

  async function copyCode() {
    if (!selected) return;
    await navigator.clipboard.writeText(selected.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function download(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand"><div className="brand-mark"><Sparkles size={18} /></div><div><strong>AI LAB</strong><span>CODE LIBRARY</span></div></div>
        <nav className="nav">{navItems.map(({ label, icon: Icon }) => <button className={activeNav === label ? "nav-item active" : "nav-item"} key={label} onClick={() => chooseNav(label)}><Icon size={18} /><span>{label}</span>{activeNav === label && <ChevronRight className="nav-arrow" size={16} />}</button>)}</nav>
        <div className="sidebar-bottom"><div className="sync-status"><span className="status-dot" />Source files synced<div>10 preserved artifacts</div></div><a className="github-link" href="https://github.com" target="_blank" rel="noreferrer"><FolderGit2 size={16} /> GitHub repository</a></div>
      </aside>
      {mobileOpen && <button className="overlay" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <section className="content">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="crumb"><span>Workspace</span><ChevronRight size={14} /><b>AI Lab Code Dashboard</b></div><div className="top-actions"><span className="live-dot" /> LOCAL SOURCE VIEW</div></header>
        <div className="page">
          <div className="hero"><div><p className="eyebrow">YOUR PRACTICAL WORKSPACE</p><h1>AI Lab <em>Code Dashboard</em></h1><p className="intro">Every experiment, algorithm, and notebook in one calm, searchable space.</p></div><div className="hero-orbit"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span>⌘</span></div></div>
          <div className="stats"><Stat icon={<Code2 />} value={programs.length} label="Source artifacts" detail="Verified workspace files" accent="purple" /><Stat icon={<FileCode2 />} value={programs.filter(p => p.kind === "python").length} label="Python files" detail="Original .py sources" accent="orange" /><Stat icon={<BookOpen />} value={programs.filter(p => p.kind === "notebook").length} label="Notebooks" detail="Jupyter experiments" accent="blue" /></div>
          <div className="library-head"><div><p className="eyebrow">SOURCE LIBRARY</p><h2>{activeNav === "Notebooks" ? "Notebook collection" : "Explore your programs"}</h2></div><div className="search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, file, or number..." aria-label="Search programs" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button>}</div></div>
          <div className="workspace-grid">
            <section className="program-list">{filtered.length ? filtered.map(program => <button className={selected?.id === program.id ? "program-card selected" : "program-card"} key={program.id} onClick={() => setSelectedId(program.id)}><div className="card-top"><span className="program-number">{program.number}</span><span className={`kind ${program.kind}`}>{program.kind === "notebook" ? "NOTEBOOK" : "PYTHON"}</span></div><h3>{program.title}</h3><p>{program.filename}</p><div className="card-footer"><span>{program.code ? `${program.code.split("\n").length} lines` : "Empty source"}</span><ChevronRight size={16} /></div></button>) : <div className="empty"><Search size={25} /><h3>No matching programs</h3><p>Try a different title, filename, or program number.</p><button onClick={() => setQuery("")}>Clear search</button></div>}</section>
            {selected && <section className="code-panel"><div className="code-head"><div><div className="file-title"><span className="file-icon"><Code2 size={15} /></span><strong>{selected.filename}</strong>{selected.verified ? <span className="verified"><Check size={12} /> verified</span> : <span className="unverified">unverified</span>}</div><p>{selected.note}</p></div><div className="code-actions"><button onClick={copyCode} disabled={!selected.code}><Clipboard size={15} />{copied ? "Copied" : "Copy Code"}</button><button className="download-button" onClick={() => download(selected.filename, selected.code)} disabled={!selected.code}><Download size={15} />Download</button></div></div><div className="code-window"><div className="window-bar"><span /><span /><span /><small>{selected.kind === "notebook" ? "python · cell order preserved" : "python"}</small></div><pre><code>{selected.code || "# This supplied source file is empty."}</code></pre></div><div className="code-foot"><span>Showing exact source · no transformations applied</span>{selected.kind === "notebook" && <a href={`/sources/${selected.filename}`} download>Download original notebook <Download size={13} /></a>}</div></section>}
          </div>
          <footer className="footer"><span>AI LAB / SOURCE-FIRST DASHBOARD</span><span>Built for focused learning <span className="footer-heart">✦</span></span></footer>
        </div>
      </section>
    </main>
  );
}

function Stat({ icon, value, label, detail, accent }: { icon: React.ReactNode; value: number; label: string; detail: string; accent: string }) {
  return <div className={`stat-card ${accent}`}><div className="stat-icon">{icon}</div><div><strong>{value}</strong><p>{label}</p><small>{detail}</small></div></div>;
}
