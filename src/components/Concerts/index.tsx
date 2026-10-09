import { FC, useState } from 'react';
import MaxWidthContainer from '../MaxWidthContainer';
import { Konzert } from '@app/services/graphql/types';
import { fetcher } from '@app/hooks/fetch/useFetch';
import useSWR from 'swr';
import { HomePage } from '@app/types';
import { normalizeDate } from '@app/utils/formatDate';
import useLang from '@app/hooks/useLang';
import ConcertSection from './elements/ConcertSection';

const Concerts: FC = () => {
  const lang = useLang();
  const { data, isLoading } = useSWR<HomePage | null>(`/api/homepage?lang=${lang}`, fetcher);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Strip time from today

  const upcomingShows = data?.konzertCollection.items
    ?.filter((live) => normalizeDate(live.datum) >= today)
    ?.sort((a, b) => normalizeDate(a.datum).getTime() - normalizeDate(b.datum).getTime());

  const pastShows = data?.konzertCollection.items
    ?.filter((live) => normalizeDate(live.datum) < today)
    ?.sort((a, b) => normalizeDate(b.datum).getTime() - normalizeDate(a.datum).getTime());

  return (
    <>
      {upcomingShows && upcomingShows?.length > 0 && (
        <ConcertSection
          title={
            data?.generell.konzertTitel || (lang === 'en' ? 'Upcoming Shows' : 'Kommende Shows')
          }
          subTitle={data?.generell.konzertUntertitel || ''}
          concerts={upcomingShows}
          shownEventsNumber={4}
        />
      )}
      {pastShows && pastShows?.length > 0 && (
        <ConcertSection
          title={
            data?.generell.vergangeneKonzertTitel ||
            (lang === 'en' ? 'Past Shows' : 'Vergangene Shows')
          }
          concerts={pastShows}
          pastConcerts
        />
      )}
    </>
  );
};

export default Concerts;
