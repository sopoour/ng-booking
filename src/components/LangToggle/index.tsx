import DeFlag from '@app/assets/DeFlag';
import UkFlag from '@app/assets/UkFlag';
import useLang from '@app/hooks/useLang';
import useSidebar from '@app/hooks/useSidebar';
import { Switch } from '@mantine/core';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

type Props = {
  className?: string;
};

const LangToggle: FC<Props> = ({ className }) => {
  const { close } = useSidebar((state) => state);
  const router = useRouter();
  const { pathname, query } = router;
  const lang = useLang();

  const isEnglish = query.lang === 'en';
  //checked = EN; unchecked = DE
  const [checked, setChecked] = useState<boolean>(false);

  const changeLang = () => {
    const newQuery = { ...query };

    if (isEnglish) {
      // switch to DE → remove lang
      delete newQuery.lang;
    } else {
      // switch to EN → add lang=en
      newQuery.lang = 'en';
    }

    router.push(
      {
        pathname,
        query: newQuery,
      },
      undefined,
      { shallow: false }, // forces reload / SSR
    );

    setChecked(isEnglish);
  };

  useEffect(() => {
    lang === 'en' ? setChecked(false) : setChecked(true);
  }, [lang]);

  return (
    <button
      id="langToggle"
      className={className}
      aria-label={`Current language: ${lang === 'en' ? 'English' : 'German'}, Select your language`}
    >
      <Switch
        size="md"
        color="#dee2e6"
        onLabel={<UkFlag />}
        offLabel={<DeFlag />}
        onChange={changeLang}
        checked={checked}
        onClick={close}
      />
    </button>
  );
};

export default LangToggle;
