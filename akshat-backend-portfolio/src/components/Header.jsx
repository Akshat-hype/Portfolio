import React from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { gmailComposeUrl } from '../data/contact.js';

const nav = [['Work','#work'],['About','#about'],['Experience','#experience'],['Contact','#contact']];

export default function Header({ menuOpen, setMenuOpen }) {
  return <header className="topbar"><a className="wordmark" href="#home">AKSHAT GOEL<span>.</span></a><button className="mobile-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button><nav className={menuOpen ? 'nav open' : 'nav'}>{nav.map(([name, href]) => <a key={name} href={href} onClick={() => setMenuOpen(false)}>{name}</a>)}<a className="nav-cta" href={gmailComposeUrl()} target="_blank" rel="noreferrer">Let’s talk <ArrowUpRight size={14}/></a></nav></header>;
}
