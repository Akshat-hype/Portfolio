import React from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  function confirmRepositoryNavigation(event) {
    if (project.inProgress && !window.confirm(`${project.name} is still in progress. The GitHub repository may be incomplete. Continue to GitHub?`)) {
      event.preventDefault();
    }
  }

  return <div className="modal-backdrop" onClick={onClose}><section className="project-modal" onClick={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={onClose} aria-label="Close"><X/></button><span className="modal-kicker">{project.type} · {project.no}</span><h2 id="modal-title">{project.name}</h2><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p className="modal-note">{project.inProgress ? 'This project is currently in progress.' : 'Explore the source code and project details in the GitHub repository.'}</p><a className="button button-dark" href={project.githubUrl} target="_blank" rel="noreferrer" onClick={confirmRepositoryNavigation}>View GitHub repository <ArrowUpRight size={15}/></a></section></div>;
}
