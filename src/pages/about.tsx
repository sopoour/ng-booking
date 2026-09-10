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

const MaxWidth = styled(MaxWidthContainer)`
  margin-top: 0;
`;

const TeamContainer = styled.div`
  ${flexColumn};
  gap: 40px;

  justify-content: center;

  ${({ theme }) => theme.media('sm')`
     ${flexRow};
     gap: 100px;
     align-items: flex-start;
  `}
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
  position: relative;
  width: 100%;
  ${flexColumn};
  gap: 16px;

  ${({ theme }) => theme.media('sm')`
    width: 350px;
  `}
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
    font-size: 52px;
    margin: 0 !important;

    ${({ theme }) => theme.media('sm')`
     font-size: 60px;
  `}
  }
`;

const TeamName = styled(Typography)`
  position: absolute;
  top: -18px;
  z-index: 5;
  font-family: ${fonts.header.style.fontFamily};
  font-size: 32px;
  margin-block: 0 !important;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  line-height: 0.85;
  overflow-wrap: break-word;
  text-shadow:
    0 3px 4px rgba(80, 60, 130, 0.5),
    0 7px 12px rgba(0, 0, 0, 0.25);

  ${({ theme }) => theme.media('sm')`
    font-size: 40px;
    top: -25px;
  `}
`;

const TeamSubTitle = styled(Typography)`
  font-family: ${fonts.subheader.style.fontFamily};
  text-align: center;
  font-size: 52px;
  margin: 60px 0 60px 0%;

  ${({ theme }) => theme.media('sm')`
    font-size: 60px;
    margin: 60px 0 100px 0;
  `}
`;

const Content = styled.div`
  ${flexColumn};
`;

const About: FC = () => {
  const lang = useLang();
  const { data, isLoading } = useSWR<AboutType | null>(`/api/about?lang=${lang}`, fetcher);

  return (
    <>
      <SeoHead title="About | NG-Booking" />
      <MaxWidth>
        <TeamMarkDown content={data?.generell.about as string} />
        <TeamSubTitle as="h2">Team</TeamSubTitle>
        <TeamContainer>
          {data?.teamMemberCollection.items.map((team) => (
            <TeamImageWrapper key={team.name}>
              <TeamName>{team.name}</TeamName>
              <Image
                src={team.profilbild?.url || ''}
                fill
                alt={`${team?.name}'s team picture`}
                sizes="(max-width: 768px) 100vw"
                style={{ objectFit: 'cover' }}
              />
              <Content>
                <Typography
                  fontSize="20px"
                  fontSizeSm="24px"
                  type={fonts.subheader.style.fontFamily}
                >
                  {team.rolle}
                </Typography>
                <MarkdownConfig content={team.beschreibung as string} />
              </Content>
            </TeamImageWrapper>
          ))}
        </TeamContainer>
      </MaxWidth>
    </>
  );
};

export default About;
