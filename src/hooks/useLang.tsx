import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useLang = () => {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'de'>('de');

  useEffect(() => {
    if (!router.isReady) return;

    const lang = router.query.lang === 'en' ? 'en' : 'de';

    setLang(lang);
  }, [router.isReady, router.query.lang]);

  return lang;
};

export default useLang;
