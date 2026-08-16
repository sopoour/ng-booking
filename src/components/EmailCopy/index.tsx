import { Tooltip } from '@mantine/core';
import { FC, useState } from 'react';
import copy from 'copy-to-clipboard';
import styled from 'styled-components';
import Typography from '../Typography/Typography';
import theme from '@app/styles/theme';
import useLang from '@app/hooks/useLang';
import fonts from '@app/fonts/fonts';

const CopyEmail = styled(Typography)`
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.colors.fg.inactive};
  }
`;

type Props = {
  email: string;
  label?: string;
};

const EmailCopy: FC<Props> = ({ email, label }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const lang = useLang();
  const copyEmail = (text: string) => {
    copy(text);
    setCopied(true);
  };

  return (
    <Tooltip
      label={
        copied
          ? lang === 'en'
            ? 'Copied!'
            : 'Kopiert!'
          : lang === 'en'
            ? 'Copy to clipboard'
            : 'E-Mail kopieren'
      }
      withArrow
      position="bottom"
      color={theme.colors.bg.default}
      offset={4}
      transitionProps={{ transition: 'pop', duration: 300 }}
      events={{ hover: true, focus: true, touch: true }}
    >
      <CopyEmail
        onClick={() => copyEmail(email)}
        onMouseLeave={() => setCopied(false)}
        type={fonts.text.style.fontFamily}
      >
        {label && `${label}: `}
        {email}
      </CopyEmail>
    </Tooltip>
  );
};

export default EmailCopy;
