import React from 'react';
import { Megaphone, UsersRound } from 'lucide-react';

const roles = [
  {
    icon: Megaphone,
    role: 'Hela Ambassador',
    organization: 'Hela',
    description: 'Represented Hela and helped build awareness and engagement around the company.',
    category: 'COMPANY AMBASSADOR',
  },
  {
    icon: UsersRound,
    role: 'Outreach Head',
    organization: 'Datum · University Tech Club',
    description: 'Led outreach for Datum, connecting the university tech club with its community and collaborators.',
    category: 'COMMUNITY LEADERSHIP',
  },
];

export default function Community() {
  return <section className="community section" id="community" data-reveal><div className="community-inner wrap"><div className="section-head"><div><div className="eyebrow">COMMUNITY & LEADERSHIP <span className="line"/></div><h2>Beyond the code<span className="red-dot">.</span></h2></div><p>Representing organizations and bringing people together through community outreach.</p></div><div className="community-grid">{roles.map(({ icon: Icon, role, organization, description, category }) => <article className="community-card" data-reveal key={role}><div className="community-icon"><Icon aria-hidden="true"/></div><span className="community-category">{category}</span><h3>{role}</h3><h4>{organization}</h4><p>{description}</p></article>)}</div></div></section>;
}
