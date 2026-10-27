import React from 'react';
import { Layers3, Server, ShieldCheck, Workflow } from 'lucide-react';

const principles = [
  { icon: Server, title: 'Scalable architecture', detail: 'Designing systems for growth' },
  { icon: ShieldCheck, title: 'Reliable by design', detail: 'Validation, retries, and recovery' },
  { icon: Layers3, title: 'Maintainable code', detail: 'Readable, modular, tested' },
  { icon: Workflow, title: 'Real-world problem solving', detail: 'Turning ideas into useful products' },
];

export default function About() {
  return <section className="approach" id="about" data-reveal><div className="wrap approach-inner"><div className="approach-top"><div><div className="eyebrow light">MY APPROACH <span className="line"/></div><h2>Engineering the logic<br/>that powers great products.</h2></div><p>From scalable backend systems to real-world products, I focus on clean architecture, performance, and meaningful impact.</p></div><div className="principles">{principles.map(({ icon: Icon, title, detail }) => <div key={title}><Icon/><span><b>{title}</b><small>{detail}</small></span></div>)}</div></div></section>;
}

