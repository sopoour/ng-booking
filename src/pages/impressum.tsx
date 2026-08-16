import LoadingSkeletonGeneral from '@app/components/LoadingSkeletonGeneral.tsx';
import MarkdownConfig from '@app/components/MarkdownConfig/MarkdownConfig';
import MaxWidthContainer from '@app/components/MaxWidthContainer';
import SeoHead from '@app/components/SeoHead';
import { fetcher } from '@app/hooks/fetch/useFetch';
import useLang from '@app/hooks/useLang';
import { Generell } from '@app/services/graphql/types';
import { FC } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

const MarkdownConfigAdjust = styled(MarkdownConfig)`
  && {
    h1 {
      font-size: 32px;
    }
    h2 {
      font-size: 18px;
    }

    ${({ theme }) => theme.media('sm')`
     
      h2 {
        font-size: 32px;
      }
      h1 {
        font-size: 48px;
      }
    `}
  }
`;

const Impressum: FC = () => {
  const lang = useLang();
  const { data, isLoading } = useSWR<Generell | null>(`/api/legalPages?lang=${lang}`, fetcher);

  if (isLoading) {
    return <LoadingSkeletonGeneral />;
  }

  return (
    <>
      <SeoHead />
      <MaxWidthContainer id="impressum">
        <MarkdownConfigAdjust content={data?.impressum as string} />
      </MaxWidthContainer>
    </>
  );
};

export default Impressum;
