import { defaultLocale, locales } from './i18n';
import type { NextApiRequest } from 'next';

export function getLocaleFromRequest(req: NextApiRequest): string {
  const lang = req.query.lang;
  if (typeof lang === 'string' && lang in locales) {
    return locales[lang as keyof typeof locales];
  }

  return defaultLocale;
}