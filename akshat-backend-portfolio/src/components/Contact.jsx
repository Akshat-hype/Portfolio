import React, { useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { contactEmail, githubUrl, gmailComposeUrl, linkedinUrl, xUrl } from '../data/contact.js';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const { name, email, subject, message } = event.currentTarget.elements;
    const body = `From: ${name.value} (${email.value})\n\n${message.value}`;
    window.open(gmailComposeUrl({ subject: subject.value || 'Portfolio enquiry', body }), '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return <section className="contact section wrap" id="contact" data-reveal><div className="contact-copy"><div className="eyebrow">LET’S CONNECT <span className="line"/></div><h2>Want to build something together?</h2><p>I’m open to backend roles, freelance projects, and conversations about building useful technology.</p><div className="socials"><a href={gmailComposeUrl()} target="_blank" rel="noreferrer" aria-label={`Email ${contactEmail}`}><span><Mail/></span><b>Email<small>{contactEmail}</small></b></a><a href={linkedinUrl} target="_blank" rel="noreferrer"><span><Linkedin/></span><b>LinkedIn<small>Let’s connect</small></b></a><a href={githubUrl} target="_blank" rel="noreferrer"><span><Github/></span><b>GitHub<small>Check out my code</small></b></a><a href={xUrl} target="_blank" rel="noreferrer"><span><Twitter/></span><b>X<small>Follow my updates</small></b></a></div></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><input name="name" placeholder="Your name" required/><input name="email" type="email" placeholder="Your email" required/></div><input name="subject" placeholder="Project / opportunity (optional)"/><textarea name="message" placeholder="Tell me a little about what you have in mind..." rows="4" required/><button className="button button-dark" type="submit">{sent ? 'Gmail compose opened' : 'Send a message'} <ArrowUpRight size={16}/></button><small>Gmail opens with your message addressed to {contactEmail}. Review it and press Send.</small></form></section>;
}
