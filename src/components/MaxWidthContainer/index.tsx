import styled from 'styled-components';

export const maxContainerPadding = { mobile: 20, desktop: 24 };

type Props = {
  $maxwidth?: number;
};
const MaxWidthContainer = styled.div<Props>`
  padding-left: ${maxContainerPadding.mobile}px;
  padding-right: ${maxContainerPadding.mobile}px;
  margin: 0 auto;
  max-width: ${(props) => props.$maxwidth}px;
  box-sizing: content-box;

  ${(props) => props.theme.media('sm')`
    padding-left: ${maxContainerPadding.desktop}px;
    padding-right: ${maxContainerPadding.desktop}px;
  `}

  > * {
    box-sizing: border-box;
  }
`;

MaxWidthContainer.defaultProps = {
  $maxwidth: 1000,
};

export default MaxWidthContainer;
