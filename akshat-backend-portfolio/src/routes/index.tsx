import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Cpu,
  Database,
  Github,
  Linkedin,
  Mail,
  Menu,
  Server,
  Shield,
  X,
  Zap,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akshat Goel — Backend Engineer" },
      { name: "description", content: "Akshat Goel builds reliable APIs, intelligent infrastructure, and products built to scale." },
      { property: "og:title", content: "Akshat Goel — Backend Engineer" },
      { property: "og:description", content: "APIs that scale. Systems that endure. Infrastructure that delivers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const LINKEDIN = "https://www.linkedin.com/in/-akshat-goel";
const EMAIL = "https://mail.google.com/mail/?view=cm&fs=1&to=akshatgoel310805%40gmail.com";
const TOOLKIT = ["NODE.JS", "TYPESCRIPT", "REST APIS", "POSTGRESQL", "REDIS", "DOCKER", "EXPRESS.JS", "GIT"];

function useTyping(texts: string[], speed = 60, pause = 2500) {
  const [i, setI] = useState(0);
  const [c, setC] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[i] ?? "";
    let t: number | undefined;
    if (!del && c < cur.length) t = window.setTimeout(() => setC(c + 1), speed);
    else if (!del) t = window.setTimeout(() => setDel(true), pause);
    else if (c > 0) t = window.setTimeout(() => setC(c - 1), speed / 2);
    else {
      setDel(false);
      setI((i + 1) % texts.length);
    }
    return () => clearTimeout(t);
  }, [c, del, i, texts, speed, pause]);
  return (texts[i] ?? "").slice(0, c);
}

const TYPED = ["APIs that scale.", "Systems that endure.", "Infrastructure that delivers.", "Code that just works."];

function SectionHead({ idx, label, title, sub, intro }: { idx: string; label: string; title: string; sub: string; intro: string }) {
  return (
    <div className="mb-12 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
      <div>
        <p className="mb-4 font-mono text-xs tracking-widest text-primary">
          <span className="text-muted-foreground">$ cd </span>/{idx} <span className="text-muted-foreground">— {label}</span>
        </p>
        <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
          {title}
          <br />
          <span className="text-muted-foreground">{sub}</span>
        </h2>
      </div>
      <p className="border-l-2 border-primary pl-4 text-muted-foreground">{intro}</p>
    </div>
  );
}

function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <span className="font-mono text-xs">
      <span className="mr-2 rounded-sm bg-primary/15 px-1.5 py-0.5 text-primary">{method}</span>
      <span className="text-muted-foreground">{path}</span>
    </span>
  );
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <article className="panel group flex flex-col transition-colors hover:border-primary">
      <div className="panel-bar">
        <span>/{p.number} · project</span>
        <span className="flex items-center gap-2 text-primary">
          <span className="live-dot" /> {p.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[0.7rem] tracking-widest text-accent">{p.category}</p>
        <h3 className="mt-3 text-2xl font-semibold">{p.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
        <div className="mt-5 rounded-sm border border-border bg-background/60 p-3 font-mono text-xs">
          <span className="text-muted-foreground">stack: </span>
          <span className="text-info">[{p.stack.map((s) => `"${s}"`).join(", ")}]</span>
        </div>
        <button onClick={onOpen} className="mt-5 inline-flex items-center gap-2 self-start font-mono text-sm text-primary group-hover:underline" aria-label={`Read case study for ${p.title}`}>
          Explore system <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
}

function ProjectDialog({ p, onClose }: { p: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!p) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [p, onClose]);
  if (!p) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="dlg" className="panel reveal max-h-[90vh] w-full max-w-2xl overflow-auto">
        <div className="panel-bar">
          <span>case file / {p.number}</span>
          <button onClick={onClose} aria-label="Close project details" className="hover:text-primary">
            <X size={18} />
          </button>
        </div>
        <div className="p-7">
          <p className="font-mono text-xs tracking-widest text-accent">{p.category}</p>
          <h2 id="dlg" className="mt-2 text-3xl font-semibold">{p.title}</h2>
          <p className="mt-4 text-muted-foreground">{p.description}</p>
          <h4 className="mt-6 font-mono text-xs tracking-widest text-primary">// ENGINEERING FOCUS</h4>
          <ul className="mt-3 space-y-2">
            {p.details.map((d) => (
              <li key={d} className="flex gap-3 text-sm">
                <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((s) => <span key={s} className="tag">{s}</span>)}
          </div>
          <p className="mt-6 border-l-2 border-accent pl-4 text-xs text-muted-foreground">
            This case study summarizes the project scope and engineering focus. Concept-stage work is labelled clearly; add the exact repository URL and measured results when they are ready to share.
          </p>
          <a className="btn btn-primary mt-6" href={p.href} target="_blank" rel="noreferrer">
            View GitHub profile <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}

function ArchNode({ icon: Icon, label, sub, tone = "text-primary" }: { icon?: typeof Server; label: string; sub: string; tone?: string }) {
  return (
    <div className="rounded-sm border border-border bg-background/70 px-4 py-3 text-center">
      {Icon && <Icon size={18} className={`mx-auto mb-1 ${tone}`} />}
      <div className="font-mono text-xs font-bold tracking-widest">{label}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

const EXPERIENCE = [
  {
    when: "PROJECT-BASED · FREELANCE",
    org2: "WOODIT · HOUSE OF BALARWA · NAWABI LABAN",
    area: "CLIENT DELIVERY / WEB DEVELOPMENT",
    role: "Freelance Web Developer",
    company: "Independent Client Projects",
    points: [
      "Built client-facing websites for WoodIt, House of Balarwa, and Nawabi Laban, adapting each implementation to the client's brand and goals.",
      "Developed WoodIt as a furniture web platform with a customer-facing website and admin portal using React, Vite, Supabase, and Tailwind CSS v4.",
      "Handled responsive UI implementation, frontend integration, and iterative refinements across project requirements.",
    ],
  },
  {
    when: "JULY 2026 — SEPTEMBER 2026",
    org2: "100XCODERS PLATFORM",
    area: "MOBILE DEVELOPMENT",
    role: "App Developer Intern",
    company: "Manorekha",
    points: [
      "Contributed to mobile application development using Flutter and Dart.",
      "Worked on application features, API integration, and debugging to support a reliable user experience.",
      "Collaborated on implementing and refining application functionality.",
    ],
  },
  {
    when: "JUNE 2025 — AUGUST 2025",
    area: "BLOCKCHAIN DEVELOPMENT",
    role: "Blockchain Developer Intern",
    company: "Kai Foundry",
    points: [
      "Worked on decentralized application development within the Internet Computer Protocol ecosystem.",
      "Collaborated with the BlockseBlock and ICP Hub India ecosystem on blockchain-based use cases.",
      "Developed experience with decentralized application architecture and smart-contract-oriented workflows.",
    ],
  },
];

const PRINCIPLES = [
  { n: "01", title: "Clarity over cleverness", text: "Make boundaries and contracts easy to understand.", icon: Zap },
  { n: "02", title: "Failure is a design case", text: "Plan for retries, timeouts, invalid input, and partial outages.", icon: Shield },
  { n: "03", title: "Measure what matters", text: "Use logs, metrics, and tests to make behavior visible.", icon: Database },
  { n: "04", title: "Security by default", text: "Validate inputs, enforce access boundaries, and protect secrets.", icon: Cpu },
];

function Index() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<Project | null>(null);
  const typed = useTyping(TYPED);
  const nav = [
    ["#work", "Selected work", "01"],
    ["#systems", "What I build", "02"],
    ["#experience", "Experience", "03"],
    ["#about", "About", "04"],
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#home" className="flex items-center gap-3 font-mono" aria-label="Akshat Goel home">
            <span className="grid h-8 w-8 place-items-center rounded-sm bg-primary font-bold text-primary-foreground">a.</span>
            <span className="text-sm leading-tight">
              AKSHAT GOEL
              <br />
              <span className="text-[0.65rem] tracking-widest text-muted-foreground">BACKEND ENGINEER</span>
            </span>
          </a>
          <button className="md:hidden" onClick={() => setMenu(!menu)} aria-label={menu ? "Close navigation" : "Open navigation"}>
            {menu ? <X /> : <Menu />}
          </button>
          <nav aria-label="Main navigation" className={`${menu ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-4 border-b border-border bg-background p-5 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}>
            {nav.map(([h, l, n]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="font-mono text-sm text-muted-foreground hover:text-primary">
                <span className="text-primary/70">{n}.</span> {l}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenu(false)} className="btn btn-ghost py-2">
              Let's talk <ArrowUpRight size={14} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.15fr_1fr] md:pt-24">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-sm border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-xs tracking-widest text-primary">
              <span className="live-dot" /> OPEN TO BACKEND OPPORTUNITIES
            </div>
            <p className="mt-8 font-mono text-xs tracking-[0.3em] text-accent">I BUILD THE THINGS YOU DON'T SEE.</p>
            <h1 className="mt-4 text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Beyond the <span className="text-muted-foreground">interface.</span>
              <br />
              Into the <span className="text-primary">engine.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              I'm Akshat — a developer exploring the architecture behind reliable APIs, intelligent infrastructure, and products built to scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#work">Explore my work <ArrowUpRight size={16} /></a>
              <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noreferrer">
                Connect on LinkedIn <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="mt-10 flex items-center gap-4 font-mono text-xs tracking-widest text-muted-foreground">
              <span>INDIA · IST</span>
              <span className="h-px w-10 bg-border" />
              <span>BACKEND / SYSTEMS / APIS</span>
            </div>
          </div>

          <div className="panel reveal self-center shadow-2xl" style={{ animationDelay: "0.15s" }}>
            <div className="panel-bar">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span>akshat.config.ts</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[0.82rem] leading-7">
              <span className="text-muted-foreground">// akshat.config.ts</span>
              {"\n"}
              <span className="text-accent">export const</span> engineer = {"{"}
              {"\n"}  name: <span className="text-primary">"Akshat Goel"</span>,
              {"\n"}  role: <span className="text-primary">"Backend Engineer"</span>,
              {"\n"}  location: <span className="text-primary">"India · IST"</span>,
              {"\n"}  stack: [<span className="text-info">"Node.js"</span>, <span className="text-info">"TypeScript"</span>, <span className="text-info">"PostgreSQL"</span>, <span className="text-info">"Redis"</span>],
              {"\n"}{"}"};
              {"\n\n"}
              <span className="text-accent">export const</span> focus = <span className="text-primary">"{typed}</span>
              <span className="cursor" />
            </pre>
            <div className="border-t border-border px-5 py-3 font-mono text-xs text-muted-foreground">
              <span className="text-primary">➜</span> ~ <span className="text-foreground">status</span> · <span className="text-primary">OPEN TO BACKEND OPPORTUNITIES</span>
            </div>
          </div>
        </section>

        {/* TOOLKIT */}
        <section aria-label="Core technologies" className="overflow-hidden border-y border-border bg-card/60 py-4">
          <div className="marquee flex w-max gap-10 font-mono text-sm tracking-widest">
            {[...TOOLKIT, ...TOOLKIT, ...TOOLKIT, ...TOOLKIT].map((t, i) => (
              <span key={i} className="flex items-center gap-10 text-muted-foreground">
                {i % TOOLKIT.length === 0 && <span className="text-accent">CURRENT TOOLKIT ›</span>}
                {t}
                <span className="text-primary">◆</span>
              </span>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead idx="01" label="SELECTED WORK" title="Systems with" sub="a point of view." intro="A selection of systems and product ideas focused on the mechanics that make software dependable: configuration, workflows, data, and APIs." />
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((p) => <ProjectCard key={p.number} p={p} onOpen={() => setActive(p)} />)}
          </div>
          <p className="mt-8 font-mono text-xs tracking-widest text-muted-foreground">
            MORE SYSTEMS IN THE LAB <span className="text-primary">—</span> DOCUMENTATION IN PROGRESS
          </p>
        </section>

        {/* SYSTEMS */}
        <section id="systems" className="border-y border-border bg-card/40">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <SectionHead idx="02" label="HOW I THINK" title="Good systems are" sub="designed, not hoped for." intro="I care about the decisions behind the endpoint: clear boundaries, predictable failures, observable behavior, and data you can trust." />
            <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
              <div className="panel">
                <div className="panel-bar">
                  <span className="flex items-center gap-2"><span className="live-dot" /> request lifecycle / 001</span>
                  <span>reference architecture</span>
                </div>
                <div className="space-y-5 p-6">
                  <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
                    <ArchNode icon={Code2} label="CLIENT" sub="Request" tone="text-info" />
                    <div className="w-8 text-center font-mono text-[0.6rem] text-muted-foreground">HTTPS<div className="flow-line mt-1" /></div>
                    <ArchNode icon={Server} label="API LAYER" sub="Validate · Auth" />
                    <div className="w-8 text-center font-mono text-[0.6rem] text-muted-foreground">ROUTE<div className="flow-line mt-1" /></div>
                    <ArchNode icon={Braces} label="SERVICE" sub="Business logic" tone="text-accent" />
                  </div>
                  <div className="ml-auto grid w-2/3 grid-cols-2 gap-3 border-t border-dashed border-border pt-5">
                    <ArchNode icon={Database} label="POSTGRES" sub="Persistent data" tone="text-info" />
                    <ArchNode icon={Zap} label="REDIS" sub="Fast reads" tone="text-destructive" />
                  </div>
                  <div className="space-y-1.5 rounded-sm border border-border bg-background/70 p-4 font-mono text-xs">
                    <Endpoint method="REQ" path="client → api → service → { postgres, redis }" />
                  </div>
                </div>
                <div className="panel-bar border-b-0 border-t">
                  <span>TRACE ID: req_8f2a…</span>
                  <span className="text-primary">OBSERVABILITY FIRST</span>
                </div>
              </div>
              <div className="divide-y divide-border border-y border-border">
                {PRINCIPLES.map(({ n, title, text, icon: Icon }) => (
                  <div key={n} className="group flex gap-4 py-5">
                    <span className="font-mono text-xs text-primary">{n}</span>
                    <div className="flex-1">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <Icon size={16} className="text-accent" /> {title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                    </div>
                    <ArrowUpRight size={16} className="text-muted-foreground transition group-hover:text-primary" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead idx="03" label="PROFESSIONAL EXPERIENCE" title="Learning by" sub="building real things." intro="Freelance client delivery alongside internship experience in mobile development and the Internet Computer ecosystem." />
          <div className="relative space-y-6 border-l border-border pl-8">
            {EXPERIENCE.map((e) => (
              <article key={e.company} className="relative">
                <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                <div className="panel">
                  <div className="panel-bar flex-wrap">
                    <span>{e.when}</span>
                    {e.org2 && <span>{e.org2}</span>}
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-xs tracking-widest text-accent">{e.area}</p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      {e.role} <span className="text-muted-foreground">— {e.company}</span>
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {e.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="font-mono text-primary">›</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="border-y border-border bg-card/40">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-[1fr_1.4fr]">
            <div className="panel self-start">
              <div className="panel-bar"><span>~/akshat</span><span>zsh</span></div>
              <div className="space-y-2 p-5 font-mono text-sm">
                {["BUILD", "SHIP", "LEARN"].map((w, i) => (
                  <p key={w}>
                    <span className="text-primary">➜</span> <span className="text-muted-foreground">loop[{i}]</span> {w.toLowerCase()}() <span className="text-primary">✓ {w}</span>
                  </p>
                ))}
                <p><span className="text-primary">➜</span> <span className="cursor" /></p>
              </div>
            </div>
            <div>
              <p className="mb-4 font-mono text-xs tracking-widest text-primary">
                <span className="text-muted-foreground">$ cd </span>/04 <span className="text-muted-foreground">— A LITTLE CONTEXT</span>
              </p>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                Curious by nature.
                <br />
                <span className="text-muted-foreground">Engineer by practice.</span>
              </h2>
              <p className="mt-6 text-muted-foreground">My path has crossed mobile development, blockchain, and full-stack products. Each one has made me more interested in what sits underneath the interface: data models, service boundaries, integrations, and the systems that hold everything together.</p>
              <p className="mt-4 text-muted-foreground">Now I'm sharpening that focus around backend engineering—building things that are easier to reason about, easier to operate, and more resilient when reality gets messy.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Product thinking", "Systems mindset", "Continuous learning"].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <a className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline" href={LINKEDIN} target="_blank" rel="noreferrer">
                More about my journey <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-28 text-center">
          <p className="font-mono text-xs tracking-widest text-primary">
            <span className="text-muted-foreground">$ cd </span>/05 <span className="text-muted-foreground">— NEXT CONNECTION</span>
          </p>
          <h2 className="mt-6 text-5xl font-bold leading-[1] tracking-tight md:text-7xl">
            Have a hard problem? <span className="text-primary">Good.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">I'm interested in thoughtful teams, difficult engineering problems, and opportunities to build useful things.</p>
          <a className="btn btn-primary mt-8" href={EMAIL}>Start a conversation <ArrowUpRight size={16} /></a>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a className="btn btn-ghost" href="https://github.com/Akshat-hype" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
            <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
            <a className="btn btn-ghost" href={EMAIL}><Mail size={16} /> Email</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-6 font-mono text-xs text-muted-foreground">
          <span><span className="text-primary">a.</span> AKSHAT GOEL · BUILT WITH CURIOSITY</span>
          <span>DESIGNED IN THE DARK. BUILT FOR THE REAL WORLD.</span>
          <a href="#home" className="hover:text-primary">BACK TO TOP ↑</a>
        </div>
      </footer>

      <ProjectDialog p={active} onClose={() => setActive(null)} />
    </div>
  );
}
