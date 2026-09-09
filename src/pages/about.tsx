import MarkdownConfig from '@app/components/MarkdownConfig/MarkdownConfig';
import MaxWidthContainer from '@app/components/MaxWidthContainer';
import SeoHead from '@app/components/SeoHead';
import Typography from '@app/components/Typography/Typography';
import fonts from '@app/fonts/fonts';
import { fetcher } from '@app/hooks/fetch/useFetch';
import useLang from '@app/hooks/useLang';
import ContentfulImage from '@app/lib/contentful-image';
import { flexColumn, flexRow } from '@app/styles/mixins';
import { AboutType } from '@app/types';
import { FC } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

const TeamContainer = styled.div`
  ${flexColumn};
  gap: 32px;
`;
const TeamMemberContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: center;

  ${({ theme }) => theme.media('sm')`
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  `}
`;
const TeamImageWrapper = styled.span`
  ${flexColumn};
  position: relative;
  gap: 8px;
`;

const Image = styled(ContentfulImage)`
  && {
    height: unset !important;
    position: relative !important;
    width: 100% !important;
  }
`;

const TeamMarkDown = styled(MarkdownConfig)`
  h1 {
    text-align: center;
    font-size: 60px;
  }
`;

const About: FC = () => {
  const lang = useLang();
  const { data, isLoading } = useSWR<AboutType | null>(`/api/about?lang=${lang}`, fetcher);

  return (
    <>
      <SeoHead title="About | NG-Booking" />
      <MaxWidthContainer>
        <TeamMarkDown content={data?.generell.about as string} />

        <Typography
          as="h2"
          type={fonts.header.style.fontFamily}
          fontSize="32px"
          fontSizeSm="44px"
          $textalign="center"
          style={{ margin: '60px 0 32px 0' }}
        >
          Team
        </Typography>
        <TeamContainer>
          {data?.teamMemberCollection.items.map((team) => (
            <TeamMemberContainer>
              <Image
                src={team.profilbild?.url || ''}
                fill
                alt={`${team?.name}'s team picture`}
                sizes="(max-width: 768px) 100vw"
                style={{ objectFit: 'cover' }}
              />
              <MarkdownConfig content={team.beschreibung as string} />
            </TeamMemberContainer>
          ))}
        </TeamContainer>
      </MaxWidthContainer>
    </>
  );
};

export default About;
