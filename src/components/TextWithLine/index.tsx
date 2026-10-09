import { FC } from 'react';
import styled from 'styled-components';
import LineDouble from './lines/line_double.svg';
import LineThin from './lines/line_thin.svg';
import LineThick from './lines/line_thick.svg';
import Typography from '../Typography/Typography';

const UnderlineContainer = styled(Typography)<{ $width?: string }>`
  position: relative;
  display: inline-block;
  width: max-content;
  svg {
    position: absolute;
    left: 0;
    bottom: -12px;
    width: ${({ $width }) => $width || '100%'};
    height: 12px;
    overflow: visible;

    > path {
      fill: ${({ theme }) => theme.colors.accent.flieder};
    }
  }
`;

type Props = {
  children: React.ReactNode;
  lineType?: number;
  fontSize?: string;
  fontSizeSm?: string;
  type?: string;
  lineWidth?: string;
};

const TextWithLine: FC<Props> = ({
  children,
  lineType = 1,
  fontSize,
  type,
  lineWidth,
  fontSizeSm,
}) => {
  const line = () => {
    switch (lineType) {
      case 1:
        return <LineThin />;
      case 2:
        return <LineThick />;
      case 3:
        return <LineDouble />;
      default:
        return <LineThin />;
    }
  };
  return (
    <UnderlineContainer fontSize={fontSize} fontSizeSm={fontSizeSm} type={type} $width={lineWidth}>
      {children} {line()}
    </UnderlineContainer>
  );
};

export default TextWithLine;
