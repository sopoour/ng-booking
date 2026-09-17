import LinkContainer from '@app/components/LinkContainer';
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
import { mapSocialLinks } from '@app/utils/formatLinks';
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
     gap: 120px;
     align-items: flex-start;
  `}
`;

const TeamImageWrapper = styled.span`
  position: relative;
  width: 100%;
  ${flexColumn};
  gap: 16px;

  ${({ theme }) => theme.media('sm')`
    width: 400px;
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
  margin: 28px 0px 90px 0px;
  h2 {
    text-align: center;
    font-size: 20px;

    ${({ theme }) => theme.media('sm')`
      font-size: 28px;
      margin: 0 !important;
  `}
  }
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

const Content = styled.div`
  ${flexColumn};
`;

const TeamMemberHeader = styled.span`
  ${flexRow}
  justify-content: space-between;
`;

const About: FC = () => {
  const lang = useLang();
  const { data, isLoading } = useSWR<AboutType | null>(`/api/about?lang=${lang}`, fetcher);

  return (
    <>
      <SeoHead title="About | NG-Booking" />
      <MaxWidth>
        <TeamMarkDown content={data?.generell.about as string} />
        <TeamContainer>
          {data?.teamMemberCollection.items.map((team) => {
            const mappedSoMeLinks = mapSocialLinks(team?.links as string[]);
            return (
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
                  <TeamMemberHeader>
                    <Typography
                      fontSize="20px"
                      fontSizeSm="24px"
                      type={fonts.subheader.style.fontFamily}
                    >
                      {team.rolle}
                    </Typography>
                    <LinkContainer iconLinks={mappedSoMeLinks} size="small" />
                  </TeamMemberHeader>

                  <MarkdownConfig content={team.beschreibung as string} />
                </Content>
              </TeamImageWrapper>
            );
          })}
        </TeamContainer>
      </MaxWidth>
    </>
  );
};

export default About;
