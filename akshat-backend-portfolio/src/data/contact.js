export const contactEmail = 'akshatgoel310805@gmail.com';
export const githubUrl = 'https://github.com/Akshat-hype';
export const xUrl = 'https://x.com/Akshat_hype';
export const linkedinUrl = 'https://www.linkedin.com/in/-akshat-goel';

export function gmailComposeUrl({ subject = '', body = '' } = {}) {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: contactEmail });
  if (subject) params.set('su', subject);
  if (body) params.set('body', body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
