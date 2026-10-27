import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/portfolio.js';

export default function Projects({ setActiveProject }) {
  return <section className="projects-section section wrap" id="work" data-reveal><div className="section-head"><div><div className="eyebrow">FEATURED WORK <span className="line"/></div><h2>Selected projects<span className="red-dot">.</span></h2></div><p>A mix of real-world products, backend systems, and engineering explorations focused on building, scaling, and integrating complex systems.</p></div><div className="project-grid">{projects.map(p => <article className="project-card" data-reveal key={p.no} onClick={() => setActiveProject(p)} tabIndex="0" onKeyDown={e => e.key === 'Enter' && setActiveProject(p)}><div className={'project-visual ' + p.tone}><span className="visual-label">{p.type}</span><span className="visual-glyph">{p.visual}</span><span className="visual-status">{p.status}</span>{p.tone === 'webhook' && <div className="flow"><i>Event</i><b>Queue</b><i>Retry</i><b>Success</b></div>}{p.tone === 'config' && <div className="config-stack"><b>CONFIG / V3</b><i/><i/><i/><small>● LIVE ENVIRONMENT</small></div>}</div><div className="project-info"><div className="project-number">PROJECT / {p.no}</div><h3>{p.name}</h3><h4>{p.title}</h4><p>{p.description}</p><div className="tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="circle-arrow" aria-label={'Read about ' + p.name} onClick={e => { e.stopPropagation(); setActiveProject(p); }}><ArrowUpRight size={18}/></button></div></article>)}</div></section>;
}



