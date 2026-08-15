import { Container, Flex } from '@mantine/core';
import { FC } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import { GenreWrapper, PressWrapper } from '.';

const TitleSkeleton = styled(Skeleton)`
  && {
    width: 250px;
    height: 40px;

    ${({ theme }) => theme.media('sm')`
      width: 300px;
      height: 60px;
  `}
  }
`;

const ImageSkeleton = styled(Skeleton)`
  && {
    width: 100%;
    height: 200px;

    ${({ theme }) => theme.media('sm')`
      width: 100%;
      height: 500px;
  `}
  }
`;

const PressSkeleton = styled(Skeleton)`
  && {
    width: 200px;
    height: 20px;

    ${({ theme }) => theme.media('sm')`
      width: 500px;
      height: 20px;
  `}
  }
`;

const PressSkeletonShort = styled(PressSkeleton)`
  width: 150px !important;
  ${({ theme }) => theme.media('sm')`
      width: 400px !important;
  `}
`;

const ArtistDetailsSkeleton: FC = () => (
  <SkeletonTheme baseColor="#6a32d8" highlightColor="#926ed8">
    <Container>
      <Flex direction={'column'} gap={'8px'} align={'center'}>
        <TitleSkeleton />
        <GenreWrapper>
          <Skeleton width={60} height={20} />
          <Skeleton width={60} height={20} />
        </GenreWrapper>
      </Flex>
      <PressWrapper>
        <ImageSkeleton />
        <Flex direction={'column'} gap={8}>
          <PressSkeleton />
          <PressSkeletonShort />
          <PressSkeleton />
          <PressSkeletonShort />
        </Flex>
      </PressWrapper>
    </Container>
  </SkeletonTheme>
);

export default ArtistDetailsSkeleton;
