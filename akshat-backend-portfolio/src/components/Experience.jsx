import React from 'react';

const roles = [
  { date: 'JUN 2025 — AUG 2025', role: 'Blockchain Developer Intern', company: 'Kai Foundry', points: ['Worked on a BTC-backed stablecoin ecosystem using ICP.', 'Explored canister-based architecture and Chain Key Bitcoin.', 'Collaborated on blockchain infrastructure and dApps.'] },
  { date: 'JUL 2026 — SEP 2026', role: 'App Developer Intern', company: 'Manorekha', points: ['Worked on the 100xCoders platform app using Flutter and Dart.', 'Implemented app features and integrated Supabase for backend and authentication.', 'Contributed to product development and feature iteration.'] },
  { date: '2024 — PRESENT', role: 'Freelance Development', company: 'Multiple clients', points: ['Built websites for WoodIt, House of Balarwa, and Nawabi Laban.', 'Worked on responsive interfaces and client-specific requirements.', 'Handled implementation from design to deployment.'] },
];

export default function Experience() {
  return <section className="experience section wrap" id="experience" data-reveal><div className="section-head"><div><div className="eyebrow">EXPERIENCE <span className="line"/></div><h2>My journey<span className="red-dot">.</span></h2></div><p>Internships, freelance delivery, and personal projects shaping my approach to backend and product engineering.</p></div><div className="timeline">{roles.map(role => <article key={role.role} data-reveal><span className="timeline-dot"/><div className="timeline-date">{role.date}</div><h3>{role.role}</h3><h4>{role.company}</h4><ul>{role.points.map(point => <li key={point}>{point}</li>)}</ul></article>)}</div></section>;
}


