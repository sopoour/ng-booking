import Typography from '@app/components/Typography/Typography';
import fonts from '@app/fonts/fonts';
import useLang from '@app/hooks/useLang';
import { flexColumn, flexRow } from '@app/styles/mixins';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { styled } from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  max-height: 64px;
  padding: 12px 0;
  gap: 32px;
  background-color: ${({ theme }) => theme.colors.bg.default};
  z-index: 2;
  color: ${({ theme }) => theme.colors.fg.contrast};
`;

const FooterContent = styled.div`
  ${flexColumn};
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media('sm')`
    gap: 8px;
  `}
`;

const Anchor = styled(Link)`
  color: white;
  font-weight: 600;
  font-family: ${fonts.subheader.style.fontFamily};
  &:hover {
    text-decoration: underline !important;
    opacity: 0.8;
  }
`;

const FooterRowTop = styled.div`
  ${flexRow};
  gap: 0px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  ${Anchor} {
    font-size: 14px;
  }

  ${({ theme }) => theme.media('sm')`
    gap: 16px;

    ${Anchor} {
      font-size: 16px;
    }
  `}
`;

const FooterRowBottom = styled.div`
  ${flexColumn}
  align-items: center;
  ${({ theme }) => theme.media('sm')`
     ${flexRow};
    gap: 8px;
  `}
`;

const Footer: FC = () => {
  const lang = useLang();
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterRowTop>
          <Anchor href={`/ueber-uns${lang === 'en' ? '?lang=en' : ''}`}>
            {lang === 'en' ? 'About' : 'Über uns'}
          </Anchor>
          <Typography> | </Typography>
          <Anchor href={`/impressum${lang === 'en' ? '?lang=en' : ''}`}>Impressum</Anchor>
          <Typography> | </Typography>
          <Anchor href={`/datenschutz${lang === 'en' ? '?lang=en' : ''}`}>
            {lang === 'en' ? 'Privacy Policy' : 'Datenschutz'}
          </Anchor>
          <Typography> | </Typography>
          <Anchor href={`/contact${lang === 'en' ? '?lang=en' : ''}`}>
            {lang === 'en' ? 'Contact' : 'Kontakt'}
          </Anchor>
        </FooterRowTop>
        <FooterRowBottom>
          <Typography fontSize="12px" fontSizeSm="14px">
            © {currentYear} NG-Booking.
          </Typography>
          <Typography fontSize="12px" fontSizeSm="14px">
            Entwickelt von {''}
            <Anchor
              href="https://www.fioauer.com/"
              target="_blank"
              style={{ fontFamily: `${fonts.text.style.fontFamily} !important` }}
            >
              Fio Auer
            </Anchor>
          </Typography>
        </FooterRowBottom>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
