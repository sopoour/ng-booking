import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { flexColumn } from '@app/styles/mixins';
import MaxWidthContainer from '../MaxWidthContainer';

const Content = styled.div`
  ${flexColumn};
  gap: 16px;
`;

const LoadingSkeletonGeneral: FC = () => {
  return (
    <MaxWidthContainer>
      <>
        <Skeleton height={40} width={300} style={{ margin: '28px 0' }} />
        <Content>
          <Skeleton height={20} width="80%" />
          <Skeleton height={20} width="100%" />
          <Skeleton height={20} width="70%" />
          <Skeleton height={20} width="90%" />
          <Skeleton height={20} width="80%" />
          <Skeleton height={20} width="75%" />
          <Skeleton height={20} width="90%" />
          <Skeleton height={20} width="85%" />
        </Content>
      </>
    </MaxWidthContainer>
  );
};

export default LoadingSkeletonGeneral;
