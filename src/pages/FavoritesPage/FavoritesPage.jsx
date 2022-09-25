import React from 'react';
import FavoritesBoard from '../../Components/FavoritesBoard/FavoritesBoard';
import Header from '../../Components/Header/Header';
import NewPostBtn from '../../Molecules/NewPostBtn/NewPostBtn';
import { Helmet } from 'react-helmet';
import { useResize } from '../../Hooks/useResize';
import LateralMenu from '../../Components/LateralMenu/LateralMenu';

const FavoritesPage = () => {
  const { isPhone } = useResize();
  return (
    <>
      <Helmet>
        <title>PostWeb | Favoritos</title>
      </Helmet>
      {isPhone ? (
        <>
          <Header /> {/* ## position:FIXED */}
          <FavoritesBoard isFavPage />
          <NewPostBtn /> {/* ## position:FIXED */}
        </>
      ) : (
        <div className="bigView">
          <LateralMenu />
          <FavoritesBoard />
        </div>
      )}
    </>
  );
};

export default FavoritesPage;
