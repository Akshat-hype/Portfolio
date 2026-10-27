import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { contactEmail, githubUrl, gmailComposeUrl, linkedinUrl, xUrl } from '../data/contact.js';

export default function Footer() {
  return <footer className="footer"><div className="wrap footer-inner"><a className="wordmark" href="#home">AKSHAT GOEL<span>.</span><small>Backend Developer · Systems Builder</small></a><div className="footer-links"><a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#contact">Contact</a></div><div className="footer-social"><a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href={xUrl} target="_blank" rel="noreferrer" aria-label="X"><Twitter/></a><a href={gmailComposeUrl()} target="_blank" rel="noreferrer" aria-label={`Email ${contactEmail}`}><Mail/></a></div><small>© {new Date().getFullYear()} Akshat Goel<br/>Built with intent.</small></div></footer>;
}
