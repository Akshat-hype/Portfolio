import React from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return <div className="modal-backdrop" onClick={onClose}><section className="project-modal" onClick={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={onClose} aria-label="Close"><X/></button><span className="modal-kicker">{project.type} · {project.no}</span><h2 id="modal-title">{project.name}</h2><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p className="modal-note">Project overview shown for portfolio presentation. Add a repository or live demo link when available.</p><a className="button button-dark" href="https://github.com/Akshat-hype" target="_blank" rel="noreferrer">View GitHub profile <ArrowUpRight size={15}/></a></section></div>;
}
