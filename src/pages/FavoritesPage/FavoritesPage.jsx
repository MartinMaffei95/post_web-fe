import React from 'react';
import FavoritesBoard from '../../Components/FavoritesBoard/FavoritesBoard';
import Header from '../../Components/Header/Header';
import NewPostBtn from '../../Molecules/NewPostBtn/NewPostBtn';
import { Helmet } from 'react-helmet';
import { useResize } from '../../Hooks/useResize';
import LateralMenu from '../../Components/LateralMenu/LateralMenu';
import { useSelector } from 'react-redux';

const FavoritesPage = ({ singlePage }) => {
  const { isPhone } = useResize();
  const myUser = useSelector(
    (state) => state.profileReducer.myProfileInformation
  );

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
      ) : singlePage ? (
        <div className="bigView favoritePage">
          <LateralMenu userData={myUser} />
          <FavoritesBoard isFavPage />
        </div>
      ) : (
        <div className="bigView favoritePage">
          <LateralMenu userData={myUser} />
          <FavoritesBoard />
        </div>
      )}
    </>
  );
};

export default FavoritesPage;
