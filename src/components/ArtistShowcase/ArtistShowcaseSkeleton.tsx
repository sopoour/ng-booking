import { FC } from 'react';
import { ArtistWrapper } from '.';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';

const ProfilePicSkeleton = styled(Skeleton)`
  && {
    width: 250px;
    height: 250px;
    ${({ theme }) => theme.media('sm')`
    width: 500px;
    height: 500px;
  `}
  }
`;

const TitleSkeleton = styled(Skeleton)`
  && {
    position: absolute;
    top: -10px;
    left: 28%;
    z-index: 5;
    width: 200px;
    height: 20px;
    text-align: center;

    ${({ theme }) => theme.media('sm')`
    top: -20px;
    left: 22%;
  `}
  }
`;

const ArtistShowcaseSkeleton: FC = () => {
  return (
    <ArtistWrapper>
      <SkeletonTheme baseColor="#6a32d8" highlightColor="#926ed8">
        <ProfilePicSkeleton />
      </SkeletonTheme>
      <SkeletonTheme baseColor="#4e269f" highlightColor="#5f478e">
        {' '}
        <TitleSkeleton />
      </SkeletonTheme>
    </ArtistWrapper>
  );
};

export default ArtistShowcaseSkeleton;
