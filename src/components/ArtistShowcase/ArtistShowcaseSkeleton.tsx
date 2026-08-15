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
    left: 27%;
    z-index: 5;
    width: 175px;
    height: 30px;
    text-align: center;

    ${({ theme }) => theme.media('sm')`
    top: -22px !important;
    left: 24% !important;
    width: 300px;
    height: 45px;
  `}

    ${({ theme }) => theme.media('xs')`
    top: -10px;
    left: 38%;
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
