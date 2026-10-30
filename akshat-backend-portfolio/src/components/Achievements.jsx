import React from 'react';
import { CalendarDays, MapPin, Trophy } from 'lucide-react';

const awards = [
  {
    name: 'Cognizance Blockathon',
    placement: '2nd Runner-Up · 3rd Place',
    event: 'Cognizance, IIT Roorkee',
    date: '13–14 March',
    summary: 'Placed third at a national-level blockchain hackathon hosted by IIT Roorkee.',
    skills: 'Blockchain development, problem-solving, and rapid prototyping in a competitive environment.',
  },
  {
    name: 'Blockchain Nexus',
    placement: '2nd Runner-Up · 3rd Place',
    event: 'Techkriti, IIT Kanpur',
    date: '27–30 March',
    summary: 'Placed third in a blockchain competition held at IIT Kanpur.',
    skills: 'Blockchain development and innovative problem-solving under competitive conditions.',
  },
];

export default function Achievements() {
  return <section className="awards section wrap" id="awards" data-reveal><div className="section-head"><div><div className="eyebrow">RECOGNITION <span className="line"/></div><h2>Achievements<span className="red-dot">.</span></h2></div><p>Blockchain competitions where I put engineering, collaboration, and rapid prototyping to the test.</p></div><div className="awards-grid">{awards.map(award => <article className="award-card" data-reveal key={award.name}><div className="award-icon"><Trophy aria-hidden="true"/></div><div className="award-placement">{award.placement}</div><h3>{award.name}</h3><div className="award-meta"><span><MapPin aria-hidden="true"/>{award.event}, India</span><span><CalendarDays aria-hidden="true"/>{award.date}</span></div><p>{award.summary}</p><p className="award-skills">{award.skills}</p></article>)}</div></section>;
}
