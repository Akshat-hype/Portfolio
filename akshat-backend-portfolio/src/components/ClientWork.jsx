import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { clients } from '../data/portfolio.js';

function ClientArtwork({ mark }) {
  if (mark === 'wood') return <><span className="furniture-shape">◒</span><b>WOODIT</b></>;
  if (mark === 'balarwa') return <><small>HOUSE OF</small><b>BALARWA</b><span className="client-art-sub">EST. WITH INTENTION</span></>;
  return <><span className="laban-mark">N</span><b>Nawabi<br/>Laban</b></>;
}

export default function ClientWork() {
  return <section className="client-work section wrap" data-reveal><div className="section-head"><div><div className="eyebrow">CLIENT WORK <span className="line"/></div><h2>Websites for real businesses<span className="red-dot">.</span></h2></div><p>Thoughtful, responsive websites built around each brand’s needs and customer experience.</p></div><div className="client-grid">{clients.map(client => <article className="client-card" data-reveal key={client.name}><div className={'client-art ' + client.mark}><ClientArtwork mark={client.mark}/></div><div className="client-copy"><span className="client-type">{client.type}</span><h3>{client.name}</h3><p>{client.description}</p><a href={client.url}>Discuss a similar project <ArrowUpRight size={14}/></a></div></article>)}</div></section>;
}



